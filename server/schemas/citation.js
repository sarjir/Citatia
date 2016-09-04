import mongoose from 'mongoose';

export default mongoose.Schema({
	text: String,
	author: String,
	publisher: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	date: Date,
	createdAt: {
		type: Date,
		default: Date.now
	},
	comments: [{
		text: String,
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		createdAt: {
			type: Date,
			default: Date.now
		}
	}],
	reactions: [{
		type: Number,
		count: Number,
		reactors: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}]
	}]
});
