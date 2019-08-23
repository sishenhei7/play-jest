// common matchers
function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('2 + 2 = 4', () => {
  expect(2 + 2).toBe(4);
});

test('object assignment', () => {
  const data = { a: 1};
  data.b = 2;
  expect(data).toEqual({ a: 1, b: 2 });
});

test('adds 1 + 2 not to be 4', () => {
  expect(1 + 2).not.toBe(4);
});

// Truthiness
test('null', () => {
  const value = null;
  expect(value).toBeNull();
  expect(value).not.toBeUndefined();
  expect(value).toBeDefined();
  expect(value).not.toBeTruthy();
  expect(value).toBeFalsy();
});

// numbers
test('1 + 2', () => {
  const value = 1 + 2;
  expect(value).toBeGreaterThan(1);
  expect(value).toBeGreaterThanOrEqual(2);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(6);
});

test('float numbers', () => {
  const value = 0.1 + 0.2;
  expect(value).toBeCloseTo(0.3);
});

// Strings
test('there is a "stop" in Cristoph', () => {
  expect('Cristoph').toMatch(/stop/);
});

// Arrays and iterables
test('wordList has abc in it', () => {
  const data = [
    'fasdfa',
    'abc',
    'fasdfa',
  ];
  expect(new Set(data)).toContain('abc');
});

// Exceptions
function throwError() {
  throw new Error('hahahhaha');
}

test('throw error', () => {
  expect(throwError).toThrow();
  expect(throwError).toThrow('hahahhaha');
  expect(throwError).toThrow(Error);
  expect(throwError).toThrow(/ahha/);
});





