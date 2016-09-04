import mongoose from 'mongoose';

// Models
import citationModel from './models/citation';
import userModel from './models/user';
import reaction from './models/reaction';
import reactionType from './models/reaction-type';

class Database {
	init() {
		mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`);

		this.db = mongoose.connection;

		this.db.on('error', this.handleError);
		this.db.once('open', this.handleOpen);
	}

	handleError = console.error.bind(console, 'connection error:'); // eslint-disable-line no-console

	handleOpen = () => {
		this.citationModel = citationModel();
		this.userModel = userModel();
		this.reaction = reaction();
		this.reactionType = reactionType();
	};
}

export default new Database();
