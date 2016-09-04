import mongoose from 'mongoose';

import CitationSchema from '../schemas/citation';

let model = null;

export default function() {
	if (!model) {
		model = mongoose.model('Citation', CitationSchema);
	}

	return model;
}
