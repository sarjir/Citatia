import mongoose from 'mongoose';

export default mongoose.Schema({
	username: String,
	password: String,
	email: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
	lastLogin: Date
});
