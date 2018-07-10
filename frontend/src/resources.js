import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const prefix = '/proxy';

const resources = {
	countries: prefix + '/countries/{id}',
	languages: prefix + '/languages/{id}'
};

for (let key in resources)
	resources[key] = Vue.resource(resources[key]);

export default resources;
