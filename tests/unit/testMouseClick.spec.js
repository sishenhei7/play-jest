import { mount } from '@vue/test-utils';
import MouseClick from './helper/MouseClick.vue';

describe('Click event', () => {
  const spy = jest.fn();
  const wrapper = mount(MouseClick, {
    propsData: {
      callMe: spy,
    },
  });

  it('Click on yes button calls our method with argument "yes"', () => {
    wrapper.find('button.yes').trigger('click');
    expect(spy).toHaveBeenCalledWith('yes');
  });

  it('Click on no button calls our method with argument "no"', () => {
    wrapper.find('button.no').trigger('click');
    expect(spy).toHaveBeenCalledWith('no');
  })
});
