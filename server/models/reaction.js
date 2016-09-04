import mongoose from 'mongoose';

import ReactionSchema from '../schemas/reaction';

let model = null;

export default function() {
	if (!model) {
		model = mongoose.model('Reaction', ReactionSchema);
	}

	return model;
}
