import utils from './helper/testMockModule';
jest.mock('./helper/testMockModule');

const utilsCreatedByGenMock = jest.genMockFromModule('./helper/testMockModule').default;

test('implementation created by jest.mock', () => {
  expect(utils.authorize.mock).toBeTruthy();
  expect(utils.isAuthorized.mock).toBeTruthy();
  expect(utils.authorize).toHaveBeenCalledTimes(0);
  expect(utils.isAuthorized).toHaveBeenCalledTimes(0);
});

test('manual mock with jest.mock', () => {
  utils.authorize = jest.fn(() => 'wizard');
  utils.isAuthorized = jest.fn(secret => secret === 'not wizard');

  expect(utils.authorize('not wizard')).toEqual('wizard');
  expect(utils.isAuthorized('not wizard')).toEqual(true);
  expect(utils.authorize).toHaveBeenCalledTimes(1);
  expect(utils.isAuthorized).toHaveBeenCalledTimes(1);
})

test('implementation created by jest.genMockFromModule', () => {
  expect(utilsCreatedByGenMock.authorize.mock).toBeTruthy();
  expect(utilsCreatedByGenMock.isAuthorized.mock).toBeTruthy();
  expect(utilsCreatedByGenMock.authorize).toHaveBeenCalledTimes(0);
  expect(utilsCreatedByGenMock.isAuthorized).toHaveBeenCalledTimes(0);
});

test('manual mock with jest.genMockFromModule', () => {
  utilsCreatedByGenMock.authorize = jest.fn(() => 'wizard');
  utilsCreatedByGenMock.isAuthorized = jest.fn(secret => secret === 'not wizard');

  expect(utilsCreatedByGenMock.authorize('not wizard')).toEqual('wizard');
  expect(utilsCreatedByGenMock.isAuthorized('not wizard')).toEqual(true);
  expect(utilsCreatedByGenMock.authorize).toHaveBeenCalledTimes(1);
  expect(utilsCreatedByGenMock.isAuthorized).toHaveBeenCalledTimes(1);
})

test('utils is not equal to utilsCreatedByGenMock', () => {
  console.log('utils', utils);
  console.log('utilsCreatedByGenMock', utilsCreatedByGenMock);
  expect(utils).not.toEqual(utilsCreatedByGenMock);
});
