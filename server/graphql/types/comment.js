import {
	GraphQLString,
	GraphQLInt,
	GraphQLObjectType
} from 'graphql';

import User from './user';

const Comment = new GraphQLObjectType({
	name: 'Comment',
	fields: () => ({
		text: {
			type: GraphQLString
		},
		author: {
			type: User
		},
		createdAt: {
			type: GraphQLInt
		}
	})
});

export default Comment;
