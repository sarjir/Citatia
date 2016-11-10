import {
	GraphQLSchema,
	graphql,
	GraphQLError
} from 'graphql';
import { expect, assert } from 'chai';
import {
	rootQuery,
	rootMutation
} from '../';

import sinon from 'sinon';
import 'sinon-mongoose';
import 'sinon-as-promised';

import {
	User as UserModel,
	Citation as CitationModel
} from 'models';

const Schema = new GraphQLSchema({
	query: rootQuery,
	mutation: rootMutation
});

describe('endpoint "addUser"', function() {
	const queryString = `mutation {
		user: addUser(username: "Linus", password: "123") {
			_id
			username
			email
			createdAt
			lastLogin
		}
	}`;

	it('Should return the created user', function(done) {
		const UserModelMock = sinon.mock(UserModel);

		UserModelMock.expects('findOne')
			.withArgs({_username: 'linus'})
			.resolves(null);

		UserModelMock.expects('create')
			.withArgs({
				username: 'Linus',
				password: '123',
				_username: 'Linus'
			})
			.resolves({
				_id: 'id',
				username: 'Linus',
				createdAt: new Date(0),
				lastLogin: null
			});

		graphql(Schema, queryString)
			.then(result => {
				UserModelMock.verify();
				UserModelMock.restore();

				try {
					expect(result).to.deep.equal({
						data: {
							user: {
								_id: 'id',
								username: 'Linus',
								email: null,
								createdAt: 0,
								lastLogin: null
							}
						}
					});

					done();
				} catch (e) {
					done(e);
				}
			}).catch((e) => {
				done(e);
			});
	});

	it('Should give an error if the user already exists', function(done) {
		const UserModelMock = sinon.mock(UserModel);

		UserModelMock.expects('findOne')
			.withArgs({_username: 'linus'})
			.resolves({});

		try {
		graphql(Schema, queryString)
			.then(result => {
				UserModelMock.verify();
				UserModelMock.restore();

				try {
					assert(result.errors[0].message === 'User already exists');

					done();
				} catch (e) {
					done(e);
				}
			}).catch((e) => {
				done(e);
			});
		} catch (e) {
			done(e);
		}
	});
});

describe('endpoint "addCitation"', function() {
	it('Should return the created citation', function(done) {
		const queryString = `mutation {
			citation: addCitation(
				text: "Some quote",
				author: "Linus Ljung",
				date: 0
			) {
				_id
				text
				author
				date
			}
		}`;

		const CitationModelMock = sinon.mock(CitationModel);

		CitationModelMock.expects('create')
			.withArgs({
				text: 'Some quote',
				author: 'Linus Ljung',
				date: new Date(0)
			})
			.resolves({
				_id: 'id',
				text: 'Some quote',
				author: 'Linus Ljung',
				date: new Date(0),
				createdAt: new Date(0)
			});

		graphql(Schema, queryString)
			.then(result => {
				CitationModelMock.verify();
				CitationModelMock.restore();

				try {
					expect(result).to.deep.equal({
						data: {
							citation: {
								_id: 'id',
								text: 'Some quote',
								author: 'Linus Ljung',
								date: 0,
							}
						}
					});

					done();
				} catch (e) {
					done(e);
				}
			}).catch((e) => {
				done(e);
			});
	});

	it('should throw an error if required fields are missing', function(done) {
		const queryString = `mutation {
			citation: addCitation() {
				_id
				text
				author
				date
			}
		}`;

		graphql(Schema, queryString)
			.then(result => {
				expect(result.errors[0]).to.be.an.instanceOf(GraphQLError);
				done();
			});
	});
});
