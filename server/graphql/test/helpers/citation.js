import mongoose from 'mongoose';
import { expect } from 'chai';

import { range } from 'lib/util';
import { citation as citationConfig } from 'config';

export const total = citationConfig.defaultLimit + 1;

export function createLimitCollection(limit = citationConfig.defaultLimit) {
	return range(limit).map((undefined, i) => ({
		_id: mongoose.Types.ObjectId('00000000000' + i),
		text: 'text' + i
	}));
}

export function prepareLimitMocks(modelMock, collection, limit = citationConfig.defaultLimit, offset = 0) {
	modelMock
		.expects('find')
		.withArgs({})
		.chain('skip', offset)
		.chain('limit').withArgs(limit)
		.resolves(collection);

	modelMock
		.expects('count')
		.resolves(total);
}

export function verifyLimitCollection(result, collection, limit = citationConfig.defaultLimit) {
	expect(result.data.citation.collection.length).to.equal(limit);
	expect(result).to.deep.equal({
		data: {
			citation: {
				collection: collection.map(item => ({ _id: item._id.toString() })),
				total
			}
		}
	});
}

export default {
	createLimitCollection,
	prepareLimitMocks
};
