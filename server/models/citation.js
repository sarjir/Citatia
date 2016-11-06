import mongoose from 'mongoose';

import CitationSchema from '../schemas/citation';

let model;

try {
	model = mongoose.model('Citation');
} catch (e) {
	model = mongoose.model('Citation', CitationSchema);
}

export default model;
