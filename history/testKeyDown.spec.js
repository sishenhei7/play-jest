import { mount } from '@vue/test-utils';
import KeyDown from './helper/KeyDown.vue';

describe('keydown event', () => {
  const wrapper = mount(KeyDown);

  it('Quantity is zero by default', () => {
    expect(wrapper.vm.quantity).toBe(0);
  })

  it('Up arrow key increments quantity by 1', () => {
    wrapper.trigger('keydown.up');
    expect(wrapper.vm.quantity).toBe(1);
  })

  it('Down arrow key decrements quantity by 1', () => {
    wrapper.vm.quantity = 5;
    wrapper.trigger('keydown.down');
    expect(wrapper.vm.quantity).toBe(4);
  })

  it('Escape sets quantity to 0', () => {
    wrapper.vm.quantity = 5;
    wrapper.trigger('keydown.esc');
    expect(wrapper.vm.quantity).toBe(0);
  })

  it('Magic character "a" sets quantity to 13', () => {
    wrapper.trigger('keydown', {
      key: 'a',
    });
    expect(wrapper.vm.quantity).toBe(13);
  })
});
