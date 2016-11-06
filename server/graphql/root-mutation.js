import {
	GraphQLString,
	GraphQLInt,
	GraphQLObjectType,
	GraphQLNonNull
} from 'graphql';
import {
	User as UserType,
	Citation as CitationType
} from './types';

import {
	User as UserModel,
	Citation as CitationModel
} from '../models';

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
		},
		addCitation: {
			type: CitationType,
			args: {
				text: {
					type: new GraphQLNonNull(GraphQLString)
				},
				author: {
					type: new GraphQLNonNull(GraphQLString)
				},
				date: {
					type: GraphQLInt
				}
			},
			async resolve(rootValue, { text, author, date }) {
				return await CitationModel.create({
					text: text,
					author: author,
					date: new Date(date),
				});
			}
		}
	})
});
