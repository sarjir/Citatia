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

import { User as UserModel } from '../../models';
import bcrypt from 'bcrypt-nodejs';

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
				UserModelMock.verify();
				UserModelMock.restore();

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
			UserModelMock.verify();
			UserModelMock.restore();

			bcryptMock.verify();
			bcryptMock.restore();
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
			UserModelMock.verify();
			UserModelMock.restore();

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
			UserModelMock.verify();
			UserModelMock.restore();

			bcryptMock.verify();
			bcryptMock.restore();
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
