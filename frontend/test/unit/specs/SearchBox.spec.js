import {mount} from 'vue-test-utils';
import SearchBox from '@/components/search-box';

describe('Search box compnent', () => {
	let wrapper = mount(SearchBox, {propsData: {value: 'test'}});
	let vm = wrapper.vm;

	it('Should set value', () => {
		expect(vm.value).toBe('test');
	});

	it('Should emit new value', () => {
		vm.emit('test value');
		expect(wrapper.emitted().input[0][0]).toBe('test value');
	});
});
