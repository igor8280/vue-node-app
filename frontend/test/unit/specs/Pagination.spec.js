import {mount} from 'vue-test-utils';
import Pagination from '@/components/pagination';

describe('Search box compnent', () => {
	let pag = {
		page: 3,
		limit: 15,
		total: 50
	};

	let wrapper = mount(Pagination, {
		propsData: {
			value: pag
		}
	});
	let vm = wrapper.vm;

	it('Should set pagination value', () => {
		expect(vm.value).toBe(pag);
	});

	it('Should change page', () => {
		vm.changePage(1);
		expect(vm.value.page).toBe(1);
	});

	it('Should change limit', () => {
		vm.changeLimit(10);
		expect(vm.value.limit).toBe(10);
	});

	it('Should correct limit', () => {
		vm.changeLimit('test');
		expect(vm.value.limit).toBe(1);

		vm.changeLimit(-5);
		expect(vm.value.limit).toBe(1);
	});

	it('Should decrease total', () => {
		vm.decreaseTotal(5);
		expect(vm.value.total).toBe(45);
	});

	it('Should set page to 1 when total is 0', () => {
		vm.value.total = 0;
		vm.calcPage();
		expect(vm.value.page).toBe(1);
	});

	it('Should set pagination to last page', () => {
		vm.value.limit = 10;
		vm.value.total = 45;
		vm.value.page = 100;
		vm.calcPage();
		expect(vm.value.page).toBe(5);
	});
});
