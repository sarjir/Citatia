import {
	GraphQLSchema,
	graphql
} from 'graphql';
import { expect, assert } from 'chai';
import {
	rootQuery,
	rootMutation
} from '../';

import sinon from 'sinon';
import 'sinon-mongoose';
import 'sinon-as-promised';

import { User as UserModel } from '../../models';

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
