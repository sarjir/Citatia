import mongoose from 'mongoose';

import ReactionTypeSchema from '../schemas/reaction-type';

let model = null;

export default function() {
	if (!model) {
		model = mongoose.model('ReactionType', ReactionTypeSchema);
	}

	return model;
}
