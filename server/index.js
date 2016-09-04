import {
	GraphQLString,
	GraphQLObjectType,

	GraphQLSchema,
} from 'graphql';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';

const app = express();

const Query = new GraphQLObjectType({
	name: 'RootQueries',
	fields: () => ({
		echo: {
			type: GraphQLString,
			args: {
				message: {
					type: GraphQLString
				}
			},
			resolve: (rootValue, args) => {
				return `Received: ${args.message}`;
			}
		},
	})
});

const Schema = new GraphQLSchema({
	query: Query
});

mongoose.connect('mongodb://localhost/citatia');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	
});

app.use(express.static('build'));

app.use('/graphql', graphqlHTTP({
	schema: Schema,
	graphiql: true
}));

app.listen(3000);

console.log('Listening on port 3000');
