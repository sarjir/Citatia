import {
	GraphQLString,
	GraphQLObjectType,
	GraphQLNonNull
} from 'graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import uuid from 'node-uuid';
import UserType from './user';
import mongoose from 'mongoose';

import { User as UserModel } from '../models';

const secretKey = uuid.v4();

function authenticateUser(username, password, user) {
	if (!user) {
		return false;
	}

	try {
		return bcrypt.compareSync(password, user.password);
	} catch (e) {
		console.error(e); //eslint-disable-line no-console
		return false;
	}
}

export default new GraphQLObjectType({
	name: 'RootQueries',
	fields: () => ({
		echo: {
			type: GraphQLString,
			args: {
				message: {
					type: GraphQLString
				}
			},
			resolve(rootValue, args) {
				return `Received: ${args.message}`;
			}
		},
		validateToken: {
			type: GraphQLString,
			args: {
				token: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve(rootValue, { token }) {
				return new Promise((resolve, reject) => {
					jwt.verify(token, secretKey, (err, decoded) => {
						if (err) {
							return reject(err);
						}

						resolve(JSON.stringify(decoded));
					});
				});
			}
		},
		user: {
			type: UserType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve(rootValue, { id }) {
				return UserModel.findOne({_id: mongoose.Types.ObjectId(id)});
			}
		},
		login: {
			type: GraphQLString,
			args: {
				username: {
					type: new GraphQLNonNull(GraphQLString)
				},
				password: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			async resolve(rootValue, { username, password }) {
				const user = await UserModel.findOne({_username: username.toLowerCase()});

				if (authenticateUser(username, password, user)) {
					return new Promise((resolve, reject) => {
						jwt.sign({}, secretKey, {
							algorithm: 'HS256',
							subject: user._id.toString(),
							issuer: 'Citatia',
							expiresIn: "1s"
						}, (err, token) => {
							if (err) {
								reject(err);
							}

							resolve(token);
						});
					});
				} else {
					throw "Incorrect username or password";
				}
			}
		}
	})
});
