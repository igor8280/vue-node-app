import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let TestModelSchema = new Schema({
	name: String
});

module.exports = mongoose.model('TestModel', TestModelSchema);