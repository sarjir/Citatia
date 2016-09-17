import {
	GraphQLString,
	GraphQLNonNull,
	GraphQLObjectType,

	GraphQLSchema,
} from 'graphql';
import UserType from './graphql/user';

import express from 'express';
import graphqlHTTP from 'express-graphql';
import database from './database';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import uuid from 'node-uuid';
import bcrypt from 'bcrypt-nodejs';

mongoose.Promise = Promise;

const app = express();

const secretKey = uuid.v4();

const query = new GraphQLObjectType({
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
				return database.UserModel.findOne({_id: mongoose.Types.ObjectId(id)});
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
				const user = await database.UserModel.findOne({_username: username.toLowerCase()});

				if (user && bcrypt.compareSync(password, user.password)) {
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

const mutation = new GraphQLObjectType({
	name: 'Mutations',
	fields: () => ({
		addUser: {
			type: UserType,
			args: {
				username: {
					type: new GraphQLNonNull(GraphQLString)
				},
				password: {
					type: new GraphQLNonNull(GraphQLString)
				},
				email: {
					type: GraphQLString
				}
			},
			async resolve(rootValue, args) {
				const user = await database.UserModel.findOne({_username: args.username.toLowerCase()});

				if (user) {
					throw "User already exists";
				}

				return database.UserModel.create({
					...args,
					_username: args.username
				});
			}
		}
	})
});

const Schema = new GraphQLSchema({
	query: query,
	mutation: mutation
});

database.init();

app.use(express.static('build'));

app.use('/graphql', graphqlHTTP({
	schema: Schema,
	graphiql: true
}));

app.listen(3000);

console.log('Listening on port 3000'); // eslint-disable-line no-console
