// http://mongoosejs.com/docs/schematypes.html
import mongoose from 'mongoose';

// https://www.npmjs.com/package/mongoose-aggregate-paginate/v/1.1.2
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate';

let Schema = mongoose.Schema;

let LanguageModelSchema = new Schema({
	name: {type:String, required: true, maxlength: 100},
	shortListed: {type: Boolean, default: false},
	isoCodeOne: {type: String, minlength: 2, maxlength: 2},
	isoCodeTwoB: {type: String, minlength: 3, maxlength: 3, required: true},
	isoCodeTwoT: {type: String, minlength: 3, maxlength: 3},
	description: String
	// picture: Schema.Types.ObjectId
}, {collection: "languages"});

// add pagination plugin
LanguageModelSchema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model('LanguageModel', LanguageModelSchema);