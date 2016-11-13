import {
	GraphQLInt,
	GraphQLString,
	GraphQLObjectType,
	GraphQLList,
	GraphQLInputObjectType
} from 'graphql';

import { citation as citationConfig } from 'config';
import { Citation as CitationModel } from 'models';
import { Range as RangeInputType } from '../inputs';
import CitationType from './citation';

const Filter = new GraphQLInputObjectType({
	name: 'Filter',
	fields: {
		_id: {
			type: GraphQLString
		},
		text: {
			type: GraphQLString
		},
		author: {
			type: GraphQLString
		},
		publisher: {
			type: GraphQLString
		},
		date: {
			type: RangeInputType
		},
		createdAt: {
			type: RangeInputType
		}
	}
});

const CitationCollection = new GraphQLObjectType({
	name: 'CitationCollection',
	fields: () => ({
		collection: {
			type: new GraphQLList(CitationType),
			args: {
				limit: {
					type: GraphQLInt,
					defaultValue: citationConfig.defaultLimit
				},
				offset: {
					type: GraphQLInt,
					defaultValue: 0
				},
				filter: {
					type: Filter
				}
			},
			resolve(source, { limit, offset, filter }) {
				return CitationModel
					.find(filter ?
						Object.keys(filter).reduce((prev, current) => {
							// If arg is a range, map `start` and `end` to mongoose `$gte` and `$lte`
							if (['date', 'createdAt'].indexOf(current) > -1) {
								return {
									...prev,
									[current]: Object.assign({},
										typeof filter[current].from === 'undefined' ? {} : {
											$gte: filter[current].from,
										},
										typeof filter[current].to === 'undefined' ? {} : {
											$lte: filter[current].to
										}
									)
								};
							}

							return {
								...prev,
								[current]: filter[current]
							};
						}, {}) :
						{}
					)
					.skip(offset)
					.limit(limit);
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
