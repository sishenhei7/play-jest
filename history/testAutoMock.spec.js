import func from './helper/autoMock';
import utils from './helper/testMockModule';

jest.mock('./helper/autoMock');
jest.mock('./helper/testMockModule');
// jest.enableAutomock(); // auto mock貌似不生效

describe('Auto Mock', () => {
  it('func will be automocked', () => {
    // console.log('func', func());
    expect(func._isMockFunction).toBeTruthy();
  });

  it('test implementation', () => {
    console.log('utils', utils);
    expect(utils.authorize()).toBe(undefined);

    utils.authorize = () => 'not mocked';
    expect(utils.authorize()).toBe('not mocked');

    utils.authorize = jest.fn(() => 'jest.fn');
    expect(utils.authorize()).toBe('jest.fn');

    // jest.genMockFromModule('./helper/testMockModule');
  });
});
