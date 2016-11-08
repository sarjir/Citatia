import {
	GraphQLString,
	GraphQLInt,
	GraphQLObjectType,
	GraphQLList,
	GraphQLNonNull
} from 'graphql';

import User from './user';
import Comment from './comment';
import Reaction from './reaction';

const Citation = new GraphQLObjectType({
	name: 'Citation',
	fields: () => ({
		_id: {
			type: GraphQLString,
		},
		text: {
			type: new GraphQLNonNull(GraphQLString)
		},
		author: {
			type: new GraphQLNonNull(GraphQLString)
		},
		publisher: {
			type: User
		},
		date: {
			type: GraphQLInt
		},
		createdAt: {
			type: GraphQLInt
		},
		comments: {
			type: new GraphQLList(Comment)
		},
		reactions: {
			type: new GraphQLList(Reaction)
		}
	})
});

export default Citation;
