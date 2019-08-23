// https://jestjs.io/docs/en/asynchronous
// callbacks
function mockFetchData(cb) {
  setTimeout(() => {
    const data = { a: 1 };
    cb(data);
  }, 1000);
}

test('mock fetch data', () => {
  const callback = data => {
    expect(data).toEqual({ a: 1 });
    done();
  };
  mockFetchData(callback);
});

