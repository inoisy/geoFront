import { mount, shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Logo from '@/components/Logo.vue'
// const wrapper = shallowMount(TestItem, {

//   stubs: {
//     NuxtLink: RouterLinkStub
//   }
// })
describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Logo)
    expect(wrapper.vm).toBeTruthy()
  })
})
