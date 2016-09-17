import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

export default mongoose.Schema({
	username: String,
	_username: {
		type: String,
		set: value => value.toLowerCase()
	},
	password: {
		type: String,
		set: value => bcrypt.hashSync(value)
	},
	email: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
	lastLogin: Date
});
