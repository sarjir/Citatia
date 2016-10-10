import {
	GraphQLString,
	GraphQLObjectType,
	GraphQLNonNull
} from 'graphql';
import UserType from './user';

import { User as UserModel } from '../models';

export default new GraphQLObjectType({
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
			async resolve(rootValue, args) {
				const user = await UserModel.findOne({_username: args.username.toLowerCase()});

				if (user) {
					throw "User already exists";
				}

				return UserModel.create({
					...args,
					_username: args.username
				});
			}
		}
	})
});
