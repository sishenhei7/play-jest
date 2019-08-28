import { mount } from '@vue/test-utils';
import CounterJs from './helper/counter';
import CounterVue from './helper/Counter.vue';

const expectedDom = '<div><span class="count">0</span> <button>Increment</button></div>';
const expectedClickedDom = '<div><span class="count">1</span> <button>Increment</button></div>';

describe('test CounterJs', () => {
  const wrapper = mount(CounterJs);

  test('it renders correct', () => {
    expect(wrapper.vm.count).toBe(0);
    expect(wrapper.html()).toEqual(expectedDom);
  });

  test('renders correct after button click', () => {
    const button = wrapper.find('button');
    button.trigger('click');
    expect(wrapper.vm.count).toBe(1);
    expect(wrapper.html()).toEqual(expectedClickedDom);
  })
});

describe('test CounterVue', () => {
  const wrapper = mount(CounterVue);

  test('it renders correct', () => {
    expect(wrapper.vm.count).toBe(0);
    expect(wrapper.html()).toEqual(expectedDom);
  });

  test('renders correct after button click', () => {
    const button = wrapper.find('button');
    button.trigger('click');
    expect(wrapper.vm.count).toBe(1);
    expect(wrapper.html()).toEqual(expectedClickedDom);
  })
});
