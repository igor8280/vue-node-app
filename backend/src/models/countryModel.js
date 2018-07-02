// http://mongoosejs.com/docs/schematypes.html
import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let CountryModelSchema = new Schema({
	name: {type:String, required: true},
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

module.exports = mongoose.model('CountryModel', CountryModelSchema);