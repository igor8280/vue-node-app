// import {mount} from 'vue-test-utils';
import Vue from 'vue';
import store from '@/store';
import LanguagesList from '@/views/languages/list';


describe('Languages list', () => {
	let getLanguages = Vue.prototype.$api.languages.get;
	let data = {
		content: [{name: 'Serbia'}],
		page: 1,
		limit: 10,
		total: 100
	};
	getLanguages.mockReturnValueOnce(new Promise(resolve => {
		let json = () => data;
		resolve({...data, json});
	}));
	let responseError = new Error('error message');
	getLanguages.mockReturnValue(new Promise((resolve, reject) => {
		reject(responseError);
	}));
	// let wrapper = mount(LanguagesList, {store});
	// let vm = wrapper.vm;
	let Constructor = Vue.extend(LanguagesList);
	let vm = new Constructor({store}).$mount();
	let path = '/languages';

	vm.$route = {path};
	vm.$router = {
		push: jest.fn()
	};

	it('Should get languages', () => {
		expect(vm.languages).toEqual(data.content);
		expect(vm.pagination).toEqual({
			page: data.page,
			limit: data.limit,
			total: data.total
		});
		expect(vm.gridLoad).toEqual(false);
	});

	it('Should handle error', () => {
		vm.$utils = jest.fn();
		vm.getLanguages().then(() => {
			expect(vm.$utils).lastCalledWith('handleError', responseError);
		});
	});

	it('Should set page to 1', () => {
		vm.search = 'test';
		vm.getLanguagesBySearch().then(() => {
			expect(vm.pagination.page).toEqual(1);
		});
	});

	it('Should save current path and go to next page', () => {
		vm.edit('test');
		expect(vm.$store.getters.session.history[0]).toEqual(path);
		expect(vm.$router.push.mock.calls.length).toEqual(1);
		expect(vm.$router.push.mock.calls[0][0]).toEqual(path + '/test');
	});

	it('Should delete selected language', () => {
		vm.$utils = jest.fn();
		vm.selectedLanguages = ['test'];
		let ok = 'test deleted';
		let err = 'test not deleted';

		let apiDelete = vm.$api.languages.delete;
		apiDelete.mockReturnValueOnce(new Promise(resolve => resolve(ok)));
		apiDelete.mockReturnValueOnce(new Promise((resolve, reject) => reject(err)));

		vm.deleteLanguage().then(() => {
			expect(vm.pagination.total).toEqual(data.total - 1);
		});

		vm.deleteLanguage().then(() => {
			expect(vm.$utils).lastCalledWith('handleError', err);
		});
	});
});
