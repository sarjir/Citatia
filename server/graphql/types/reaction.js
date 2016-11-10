import {
	GraphQLInt,
	GraphQLObjectType,
	GraphQLList
} from 'graphql';

import User from './user';

const Reaction = new GraphQLObjectType({
	name: 'Reaction',
	fields: () => ({
		type: {
			type: GraphQLInt
		},
		reactors: {
			type: new GraphQLList(User)
		}
	})
});

export default Reaction;
