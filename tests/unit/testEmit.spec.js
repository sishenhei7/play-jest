import { shallowMount } from '@vue/test-utils';
import ChildModule from './helper/ChildModule';
import ChildComponent from './helper/ChildComponent';
import ParentComponent from './helper/ParentComponent.vue';

jest.mock('./helper/ChildModule');
const mockDestroy = jest.fn();
const ChildModuleFake = {
  destroy: mockDestroy,
};
ChildModule.mockImplementation(() => ChildModuleFake);

describe('emit custom event', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("displays 'Emitted!' when custom event is emitted", () => {
    const wrapper = shallowMount(ParentComponent);
    wrapper.find(ChildComponent).vm.$emit('custom');
    expect(wrapper.vm.emitted).toBeTruthy();
    expect(wrapper.html()).toContain('Emitted!');
  });

  it("displays 'Called!' when callback is called", () => {
    const wrapper = shallowMount(ParentComponent);
    const callback = ChildModule.mock.calls[0].callback;

    callback();
    expect(wrapper.vm.called).toBeTruthy;
    expect(wrapper.html()).toContain('Called!');

    // 销毁组件
    expect(mockDestroy).toHaveBeenCalledTimes(0);
    wrapper.$destroy();
    expect(mockDestroy).toHaveBeenCalledTimes(1);
  });
});


