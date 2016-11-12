import {
	GraphQLString,
	GraphQLInt,
	GraphQLObjectType
} from 'graphql';

const User = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		_id: {
			type: GraphQLString,
			resolve({ _id }) {
				return _id.toString();
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
				if (createdAt instanceof Date) {
					return createdAt.getTime() / 1000;
				}
			}
		},
		lastLogin: {
			type: GraphQLInt,
			resolve({ lastLogin }) {
				if (lastLogin instanceof Date) {
					return lastLogin.getTime() / 1000;
				}
			}
		}
	})
});

export default User;
