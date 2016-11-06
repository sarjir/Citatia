import {
	GraphQLString,
	GraphQLInt,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLList
} from 'graphql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt-nodejs';
import uuid from 'node-uuid';
import UserType from './types/user';
import CitationType from './types/citation';
import mongoose from 'mongoose';

import {
	User as UserModel,
	Citation as CitationModel
} from '../models';

import { citation as citationConfig } from 'config';

const secretKey = uuid.v4();

function authenticateUser(username, password, user) {
	if (!user) {
		return false;
	}

	try {
		return bcrypt.compareSync(password, user.password);
	} catch (e) {
		console.error(e);
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
		},
		citation: {
			type: new GraphQLList(CitationType),
			args: {
				limit: {
					type: GraphQLInt,
					defaultValue: citationConfig.defaultLimit
				}
			},
			async resolve(rootValue, { limit }) {
				const [citations, total] = await Promise.all([
					CitationModel.find({}).limit(limit),
					CitationModel.count({})
				]);

				return {
					citations,
					total
				};
			}
		}
	})
});
