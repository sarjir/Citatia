import {
	GraphQLSchema,
	graphql
} from 'graphql';
import { expect } from 'chai';
import {
	rootQuery,
	rootMutation
} from '../';
import sinon from 'sinon';
import mongoose from 'mongoose';
import 'sinon-mongoose';
import 'sinon-as-promised';
import bcrypt from 'bcrypt-nodejs';
import { verify } from 'helpers/test';
import {
	createLimitCollection,
	prepareLimitMocks,
	verifyLimitCollection,
	total
} from './helpers/citation';

import {
	User as UserModel,
	Citation as CitationModel
} from '../../models';

const Schema = new GraphQLSchema({
	query: rootQuery,
	mutation: rootMutation
});

function getFakeUser() {
	return {
		_id: "id",
		username: 'Linus',
		_username: 'linus',
		password: 'somehash',
		email: null
	};
}

describe('endpoint "echo"', function() {
	it('should echo the `message` argument', function(done) {
		graphql(
			Schema,
			`query {
				message: echo(message: "Hello World!")
			}`
		).then(result => {
			expect(result).to.deep.equal({
				data: {
					message: 'Received: Hello World!'
				}
			});

			done();
		});
	});
});

describe('endpoint "user"', function() {
	it('should return a user by ID', function(done) {
		const UserModelMock = sinon.mock(UserModel);

		try {
			UserModelMock.expects('findOne')
				.withArgs({_id: mongoose.Types.ObjectId('000000000000')})
				.resolves({_id: '000000000000'});

			graphql(
				Schema,
				`query {
						user(id: "000000000000") {
							_id
						}
					}`
			).then(result => {
				try {
					UserModelMock.verify();

					UserModelMock.restore();
				} catch (e) {
					return done(e);
				}

				try {
					expect(result).to.deep.equal({
						data: {
							user: {
								_id: '000000000000'
							}
						}
					});

					done();
				} catch (e) {
					UserModelMock.restore();

					done(e);
				}
			});
		} catch (e) {
			done(e);
		}
	});
});

describe('endpoint "login"', function() {
	it('should provide a JWT for the authenticated user', function(done) {
		const UserModelMock = sinon.mock(UserModel),
			bcryptMock = sinon.mock(bcrypt);

		UserModelMock.expects('findOne')
			.withArgs({_username: 'linus'})
			.resolves(getFakeUser());

		bcryptMock.expects('compareSync')
			.withArgs('123', 'somehash')
			.returns(true);

		graphql(
			Schema,
			`query {
			  token: login(username: "Linus", password: "123")
			}`
		).then(result => {
			try {
				UserModelMock.verify();
				bcryptMock.verify();

				UserModelMock.restore();
				bcryptMock.restore();
			} catch (e) {
				return done(e);
			}

			try {
				expect(result).to.have.deep.property('data.token').to.be.a('string');
				done();
			} catch (e) {
				done(e);
			}
		});
	});

	it('Should return a message if user does not exist', function(done) {
		const UserModelMock = sinon.mock(UserModel);

		UserModelMock.expects('findOne')
			.withArgs({_username: 'linus'})
			.resolves(null);

		graphql(
			Schema,
			`query {
			  token: login(username: "Linus", password: "123")
			}`
		).then(result => {
			try {
				UserModelMock.verify();

				UserModelMock.restore();
			} catch (e) {
				return done(e);
			}

			try {
				expect(result.errors).to.be.an('array');
				expect(result.errors[0].message).to.equal("Incorrect username or password");
				done();
			} catch (e) {
				done(e);
			}
		});
	});

	it("Should return a message if the password is incorrect", function(done) {
		const UserModelMock = sinon.mock(UserModel),
			bcryptMock = sinon.mock(bcrypt);

		UserModelMock.expects('findOne')
			.withArgs({_username: 'linus'})
			.resolves(getFakeUser());

		bcryptMock.expects('compareSync')
			.withArgs('123', 'somehash')
			.returns(false);

		graphql(
			Schema,
			`query {
			  token: login(username: "Linus", password: "123")
			}`
		).then(result => {
			try {
				UserModelMock.verify();
				bcryptMock.verify();

				UserModelMock.restore();
				bcryptMock.restore();
			} catch (e) {
				return done(e);
			}

			try {
				expect(result.errors).to.be.an('array');
				expect(result.errors[0].message).to.equal("Incorrect username or password");
				done();
			} catch (e) {
				done(e);
			}
		});
	});
});

describe('endpoint "citation"', function() {
	context('limits and offsets', function() {
		it('should return a collection with a default limit', function (done) {
			const CitationModelMock = sinon.mock(CitationModel);
			const collection = createLimitCollection();

			prepareLimitMocks(CitationModelMock, collection);

			graphql(
				Schema,
				`query {
					citation {
						collection {
							_id
						},
						total
					}
				}`
			)
			.then(result => {
				try {
					verify(result, [CitationModelMock]);
					verifyLimitCollection(result, collection);
				} catch (e) {
					return done(e);
				}

				CitationModelMock.restore();

				done();
			})
			.catch(e => {
				done(e);
			});
		});

		it('should return a collection with a given limit', function (done) {
			const limit = 2;
			const CitationModelMock = sinon.mock(CitationModel);
			const collection = createLimitCollection(limit);

			prepareLimitMocks(CitationModelMock, collection, limit);

			try {
				graphql(
					Schema,
					`query {
						citation {
							collection(limit: ${limit}) {
								_id
							},
							total
						}
					}`
				).then(result => {
					try {
						verify(result, [CitationModelMock]);
						verifyLimitCollection(result, collection, limit);

						CitationModelMock.restore();
					} catch (e) {
						return done(e);
					}

					done();
				});
			} catch (e) {
				done(e);
			}
		});

		it('should return a collection with a given offset', function (done) {
			const CitationModelMock = sinon.mock(CitationModel);
			const collection = createLimitCollection();
			const offset = 5;

			prepareLimitMocks(CitationModelMock, collection, undefined, offset);

			try {
				graphql(
					Schema,
					`query {
						citation {
							collection(offset: ${offset}) {
								_id
							}
							total
						}
					}`
				).then(result => {
					try {
						verify(result, [CitationModelMock]);
						verifyLimitCollection(result, collection);

						CitationModelMock.restore();
					} catch (e) {
						return done(e);
					}

					done();
				});
			} catch (e) {
				done(e);
			}
		});
	});

	describe('filters', function() {
		it('should return a collection filtered by attributes', function(done) {
			const CitationModelMock = sinon.mock(CitationModel);

			CitationModelMock
				.expects('find')
				.withArgs({
					author: "Linus",
					date: {
						$gte: 0,
						$lte: 1
					}
				})
				.chain('skip')
				.chain('limit')
				.resolves([]);

			CitationModelMock
				.expects('find')
				.withArgs({
					author: "Linus",
					date: {
						$gte: 0
					}
				})
				.chain('skip')
				.chain('limit')
				.resolves([]);

			try {
				graphql(
					Schema,
					`query {
						citation1: citation {
							collection(filter: {
								author: "Linus",
								date: {
									from: 0,
									to: 1
								}
							}) {
								_id
							}
						},
						citation2: citation {
							collection(filter: {
								author: "Linus",
								date: {
									from: 0
								}
							}) {
								_id
							}
						}
					}`
				).then(result => {
					try {
						verify(result, [CitationModelMock]);

						CitationModelMock.restore();
					} catch (e) {
						return done(e);
					}

					done();
				});
			} catch (e) {
				done(e);
			}
		});
	});

	describe.skip('sorting', function() {
	});
});
