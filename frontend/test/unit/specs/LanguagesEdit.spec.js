// import {mount} from 'vue-test-utils';
import Vue from 'vue';
import store from '@/store';
import LanguagesEdit from '@/views/languages/edit';

describe('Languages list', () => {
	let getLanguages = Vue.prototype.$api.languages.get;
	let updateLanguage = Vue.prototype.$api.languages.update;
	let saveLanguage = Vue.prototype.$api.languages.save;
	let data = {
		name: 'Serbia',
		isoCodeTwoB: '123',
		description: 'test description',
		shortListed: true
	};
	getLanguages.mockReturnValueOnce(new Promise(resolve => {
		let json = () => data;
		resolve({...data, json});
	}));

	let responseError = new Error('error message');
	getLanguages.mockReturnValue(new Promise((resolve, reject) => {
		reject(responseError);
	}));

	let Constructor = Vue.extend(LanguagesEdit);
	let vm = new Constructor({store});
	vm.$route = {
		params: {
			id: 'language-id'
		}
	};
	vm.$mount();

	it('Should set correct title', () => {
		vm.formCreate = true;
		expect(vm.title).toEqual('Add Language');

		vm.formCreate = false;
		expect(vm.title).toEqual('Edit Language');
	});

	it('Should set language data', () => {
		expect(vm.language).toEqual(data);
	});

	it('Should not call get language api', () => {
		vm.formCreate = true;
		expect(vm.getLanguage()).toBeUndefined();
	});

	it('Should handle error when getting data', () => {
		vm.formCreate = false;
		vm.$utils = jest.fn();
		vm.getLanguage().then(() => {
			expect(vm.$utils).lastCalledWith('handleError', responseError);
		});
	});

	it('Should validate form', () => {
		vm.language.name = '';
		vm.saveLanguage().then((valid) => {
			vm.language.name = 'Serbia';
			expect(valid).toBe(false);
		});
	});

	it('Should update data', () => {
		updateLanguage.mockReturnValueOnce(new Promise(resolve => resolve('ok')));
		vm.formCreate = false;
		vm.saveLanguage().then(() => {
			expect(vm.$utils).lastCalledWith('goBack');
		});
	});

	it('Should handle error when updating data', () => {
		let error = new Error();
		updateLanguage.mockReturnValueOnce(new Promise((resolve, reject) => reject(error)));
		vm.formCreate = false;
		vm.saveLanguage().then(() => {
			expect(vm.$utils).lastCalledWith('handleError', error);
		});
	});

	it('Should save data', () => {
		saveLanguage.mockReturnValueOnce(new Promise(resolve => resolve('ok')));
		vm.formCreate = true;
		vm.saveLanguage().then(() => {
			expect(vm.$utils).lastCalledWith('goBack');
		});
	});

	it('Should handle error when saving data', () => {
		let error = new Error();
		saveLanguage.mockReturnValueOnce(new Promise((resolve, reject) => reject(error)));
		vm.formCreate = true;
		vm.saveLanguage().then(() => {
			expect(vm.$utils).lastCalledWith('handleError', error);
		});
	});
});
