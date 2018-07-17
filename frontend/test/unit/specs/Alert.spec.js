import Vue from 'vue'
import Alert from '@/components/Alert'

describe('Alert.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Alert)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.Alert h1').textContent)
      .toEqual('hello!')
  })
})
