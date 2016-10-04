import { GraphQLSchema } from 'graphql';

import express from 'express';
import graphqlHTTP from 'express-graphql';
import database from './database';
import mongoose from 'mongoose';

import {
	rootQuery,
	rootMutation
} from './graphql';

mongoose.Promise = Promise;

const app = express();

const Schema = new GraphQLSchema({
	query: rootQuery,
	mutation: rootMutation
});

database.init();

app.use(express.static('build'));

app.use('/graphql', graphqlHTTP({
	schema: Schema,
	graphiql: true
}));

app.listen(3000);

console.log('Listening on port 3000'); // eslint-disable-line no-console
