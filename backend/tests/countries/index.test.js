import expect from 'expect';
import request from 'supertest';
import {ObjectID} from 'mongodb';

import app from '../../src/index';
import Country from '../../src/models/country';

const countries = [{
	_id: new ObjectID(),
	name: 'Country1',
	isoCodeTwo: 'CO',
	isoCodeThree: 'CO1'
}, {
	_id: new ObjectID(),
	name: 'Country2',
	isoCodeTwo: 'CO',
	isoCodeThree: 'CO2'
}];

beforeEach((done) => {
	Country.remove({}).then(() => {
		return Country.insertMany(countries);
	}).then(() => done());
});
describe('REST Country endpoints', () => {
	describe('POST /v1/countries', () => {
		it('should create a new country', (done) => {
			let country = {
				_id: new ObjectID(),
				name: 'TestCountry',
				isoCodeTwo: 'TC',
				isoCodeThree: 'TCO'
			};

			request(app)
				.post('/v1/countries')
				.send(country)
				.expect(200)
				.expect((res) => {
					expect(res.body.message).toBe('Record added successfully!');
				})
				.end((err, res) => {
					if (err) {
						return done(err);
					}

					Country.find({'name': country.name}).then((countries) => {
						expect(countries.length).toBe(1);
						expect(countries[0].name).toBe(country.name);
						done();
					}).catch((e) => done(e));
				});
		});

		it('should not create country with invalid body data', (done) => {
			request(app)
				.post('/v1/countries')
				.send({})
				.expect(400)
				.end((err, res) => {
					if (err) {
						return done(err);
					}

					Country.find().then((countries) => {
						expect(countries.length).toBe(2);
						done();
					}).catch((e) => done(e));
				});
		});
	});

	describe('GET /v1/countries', () => {
		it('should get all countries', (done) => {
			request(app)
				.get('/v1/countries')
				.expect(200)
				.expect((res) => {
					expect(res.body.content.length).toBe(2);
				})
				.end(done);
		});
	});

	describe('GET /v1/countries/:id', () => {
		it('should return country document', (done) => {
			request(app)
				.get(`/v1/countries/${countries[0]._id.toHexString()}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.name).toBe(countries[0].name);
				})
				.end(done);
		});

		it('should return 404 if country not found', (done) => {
			let hexId = new ObjectID().toHexString();

			request(app)
				.get(`/v1/country/${hexId}`)
				.expect(404)
				.end(done);
		});

		it('should return 404 for non-object ids', (done) => {
			request(app)
				.get('/countries/123abc')
				.expect(404)
				.end(done);
		});
	});

	describe('DELETE /countries/:id', () => {
		it('should remove a country', (done) => {
			let hexId = countries[1]._id.toHexString();

			request(app)
				.delete(`/v1/countries/${hexId}`)
				.expect(200)
				.expect((res) => {
					expect(res.body.data._id).toBe(hexId);
				})
				.end((err, res) => {
					if (err) {
						return done(err);
					}

					Country.findById(hexId).then((country) => {
						// expect(country).toNotExist(); ??? ZASTO OVO NE RADI ???
						expect(country).toBeFalsy(); // OVO JE ALIAS ZA toNotExist() ???
						done();
					}).catch((e) => done(e));
				});
		});

		it('should return 404 if country is not found', (done) => {
			let hexId = new ObjectID().toHexString();

			request(app)
				.delete(`/v1/countries/${hexId}`)
				.expect(404)
				.end(done);
		});

		it('should return 400 if object id is invalid - Bad request', (done) => {
			request(app)
				.delete('/v1/countries/abc123')
				.expect(400)
				.expect((res) => {
					expect(res.body.name).toEqual('CastError');
				})
				.end(done);
		});
	});

	describe('PUT /v1/countries/:id', () => {
		it('should update a country', (done) => {
			let hexId = countries[0]._id.toHexString();
			let updatedCountry = {
				_id: hexId,
				name: 'UpdatedCountry',
				isoCodeTwo: 'UC',
				isoCodeThree: 'UCT'
			};

			request(app)
				.put(`/v1/countries/${hexId}`)
				.send(updatedCountry)
				.expect(200)
				.expect((res) => {
					expect(res.body.message).toBe('Record updated successfully!');

					expect(res.body.data.name).toBe(updatedCountry.name);
					expect(res.body.data.isoCodeTwo).toBe(updatedCountry.isoCodeTwo);
					expect(res.body.data.isoCodeThree).toBe(updatedCountry.isoCodeThree);
					// expect(res.body.data.isoCodeTwo).toBeA('string'); // PUCA!!! ???
					// expect(res.body.data.isoCodeThree).toBeA('string');
				})
				.end(done);
		});

		it('should return 500 when countryId is not sent in body', (done) => {
			let hexId = countries[0]._id.toHexString();
			let updatedCountry = {
				name: 'UpdatedCountry',
				isoCodeTwo: 'UC',
				isoCodeThree: 'UCT'
			};

			request(app)
				.put(`/v1/countries/${hexId}`)
				.send(updatedCountry)
				.expect(500)
				.expect((res) => {
					expect(res.body.message).toBe('Internal server error');
				})
				.end(done);
		});
	});
});
