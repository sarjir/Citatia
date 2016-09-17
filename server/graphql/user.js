import {
	GraphQLString,
	GraphQLInt,
	GraphQLObjectType,
} from 'graphql';

const User = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		_id: {
			type: GraphQLString,
			resolve(rootValue) {
				return rootValue._id.toString();
			}
		},
		username: {
			type: GraphQLString
		},
		email: {
			type: GraphQLString
		},
		createdAt: {
			type: GraphQLInt,
			resolve({ createdAt }) {
				if (createdAt) {
					return createdAt.getTime() / 1000;
				}
			}
		},
		lastLogin: {
			type: GraphQLInt,
			resolve({ lastLogin }) {
				if (lastLogin) {
					return lastLogin.getTime() / 1000;
				}
			}
		}
	})
});

export default User;
