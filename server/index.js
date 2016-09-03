import {
	GraphQLString,
	GraphQLObjectType,

	GraphQLSchema,
} from 'graphql';
import express from 'express';
import graphqlHTTP from 'express-graphql';

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

app.use(express.static('build'));

app.use('/graphql', graphqlHTTP({
	schema: Schema,
	graphiql: true
}));

app.listen(3000);

console.log('Listening on port 3000');
