import {
	GraphQLInt,
	GraphQLObjectType,
	GraphQLList
} from 'graphql';

import { citation as citationConfig } from 'config';

import { Citation as CitationModel } from 'models';
import CitationType from './citation';

const CitationCollection = new GraphQLObjectType({
	name: 'CitationCollection',
	fields: () => ({
		collection: {
			type: new GraphQLList(CitationType),
			args: {
				limit: {
					type: GraphQLInt,
					defaultValue: citationConfig.defaultLimit
				}
			},
			resolve(source, { limit }) {
				return CitationModel.find().limit(limit);
			}
		},
		total: {
			type: GraphQLInt,
			resolve() {
				return CitationModel.count();
			}
		}
	})
});

export default CitationCollection;
