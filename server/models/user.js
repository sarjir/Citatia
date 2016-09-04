import mongoose from 'mongoose';

import UserSchema from '../schemas/user';

let model = null;

export default function() {
	if (!model) {
		model = mongoose.model('User', UserSchema);
	}

	return model;
}
