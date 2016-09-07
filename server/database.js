import mongoose from 'mongoose';

// Models
import citationModel from './models/citation';
import userModel from './models/user';
import reactionModel from './models/reaction';
import reactionTypeModel from './models/reaction-type';

class Database {
	initialized = false;

	init() {
		if (this.initialized) {
			return;
		}

		this.initialized = true;

		mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`);

		this.db = mongoose.connection;

		this.db.on('error', this.handleError);
		this.db.once('open', this.handleOpen);
	}

	handleError = console.error.bind(console, 'connection error:'); // eslint-disable-line no-console

	handleOpen = () => {
		this.CitationModel = citationModel();
		this.UserModel = userModel();
		this.Reaction = reactionModel();
		this.ReactionType = reactionTypeModel();
	};
}

export default new Database();
