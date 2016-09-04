import mongoose from 'mongoose';

export default mongoose.Schema({
	type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ReactionType'
	},
	reactor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	entity: {
		type: mongoose.Schema.Types.ObjectId,
		modelName: String
	}
});
