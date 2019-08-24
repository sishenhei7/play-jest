// https://jestjs.io/docs/en/asynchronous
// callbacks
const mockFetchData = require('./helper/testAsync');

test('mock fetch data', () => {
  const callback = data => {
    expect(data).toEqual({ a: 1 });
    done();
  };
  mockFetchData(callback);
});

