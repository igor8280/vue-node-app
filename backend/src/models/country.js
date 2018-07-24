// http://mongoosejs.com/docs/schematypes.html
import mongoose from 'mongoose';

// https://www.npmjs.com/package/mongoose-aggregate-paginate/v/1.1.2
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate';

import ErrorHandler from '../middlewares/errorHandler';

const Schema = mongoose.Schema;

const CountryModelSchema = new Schema({
	name: {type:String, required: true, maxlength: 100},
	shortListed: {type: Boolean, default: false},
	isoCodeTwo: {type: String, minlength: 2, maxlength: 2, required: true},
	isoCodeThree: {type: String, minlength: 3, maxlength: 3, required: true},
	description: String,
	taxRate: {
		type: Number,
		get: v => Math.round(v),
		set: v => Math.round(v)
	},
	currency: String
	// picture: Schema.Types.ObjectId
}, {collection: "countries"});

// attach error handler
new ErrorHandler(CountryModelSchema);

// add pagination plugin
CountryModelSchema.plugin(mongooseAggregatePaginate);

export default mongoose.model('CountryModel', CountryModelSchema);
