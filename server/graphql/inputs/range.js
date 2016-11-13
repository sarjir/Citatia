import {
	GraphQLInt,
	GraphQLInputObjectType
} from 'graphql';

export default new GraphQLInputObjectType({
	name: 'Range',
	fields: {
		from: {
			type: GraphQLInt
		},
		to: {
			type: GraphQLInt
		}
	}
});
