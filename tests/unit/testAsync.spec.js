// https://jestjs.io/docs/en/asynchronous
// callbacks
import {
  mockFetchData,
  mockPromise,
  mockPromiseReject,
} from './helper/testAsync';

test('mock fetch data', done => {
  const callback = data => {
    expect(data).toEqual({ a: 1 });
    done();
  };
  mockFetchData(callback);
});

// promises
test('mock promise success', () => {
  return mockPromise().then(res => expect(res).toBe('mock promise!'));
});

test('mock promise reject', () => {
  expect.assertions(1);
  return mockPromiseReject().catch(res => expect(res).toBe('error!'));
});

// .resolves/.rejects
test('mock promise success', () => {
  return expect(mockPromise()).resolves.toBe('mock promise!');
});

test('mock promise reject', () => {
  return expect(mockPromiseReject()).rejects.toBe('error!');
});

// Async/Await
test('mock promise success', async () => {
  const data = await mockPromise();
  expect(data).toBe('mock promise!')
});

test('mock promise reject', async () => {
  expect.assertions(1);
  try {
    await mockPromiseReject();
  } catch(e) {
    expect(e).toBe('error!');
  }
});

// Async/Await with .resolves/.rejects
test('mock promise success', async () => {
  await expect(mockPromise()).resolves.toBe('mock promise!');
});

test('mock promise reject', async () => {
  await expect(mockPromiseReject()).rejects.toBe('error!');
});
