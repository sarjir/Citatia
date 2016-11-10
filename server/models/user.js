import mongoose from 'mongoose';

import UserSchema from '../schemas/user';

let model;

try {
	model = mongoose.model('User');
} catch (e) {
	model = mongoose.model('User', UserSchema);
}

export default model;
