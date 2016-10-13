import mongoose from 'mongoose';

class Database {
	initialized = false;

	init() {
		if (this.initialized) {
			return;
		}

		this.initialized = true;

		mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT || 27017}/${process.env.DB_NAME}`);

		this.db = mongoose.connection;

		this.db.on('error', this.handleError);
	}

	handleError = console.error.bind(console, 'connection error:'); // eslint-disable-line no-console
}

export default new Database();
