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

const app = express();

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
			resolve(rootValue, args) {
				return new Promise((resolve, reject) => {
					database.UserModel.create(args, (err, user) => {
						if (err) {
							reject();
						} else {
							resolve(user);
						}
					});
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
