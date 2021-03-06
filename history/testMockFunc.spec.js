import axios from 'axios';
import {
  forEach,
  Users,
} from './helper/testMockFunc';
import foo from './helper/testMockImplementation';

jest.mock('axios');
jest.mock('./helper/testMockImplementation');

// using a mock function
test('test mock function', () => {
  const mockCallback = jest.fn(x => 42 + x);
  forEach([0, 1], mockCallback);

  expect(mockCallback.mock.calls.length).toBe(2);
  expect(mockCallback.mock.calls[0][0]).toBe(0);
  expect(mockCallback.mock.results[0].value).toBe(42);
  console.log('mockCallback', mockCallback.mock);
});

// .mock property
test('test mock function instances', () => {
  const myMock = jest.fn(x => 32 + x);

  const a = new myMock();
  const b = new myMock();
  const c = {};
  const bound = myMock.bind(c);
  bound();

  console.log('myMock', myMock.mock);
  console.log('myMock name', myMock.mock.instances[2].name);
});

// mock return values
test('mock return values', () => {
  const myMock = jest.fn();
  console.log('myMock', myMock());

  myMock
    .mockReturnValueOnce(10)
    .mockReturnValueOnce('x')
    .mockReturnValue(true)
    .mockReturnValueOnce('haha');

  console.log(myMock(), myMock(), myMock(), myMock(), myMock());
});

test('mock functional continuation-passing style', () => {
  const myMock = jest.fn();

  myMock
    .mockReturnValueOnce(true)
    .mockReturnValueOnce(false)
    .mockReturnValueOnce(true);

  const result = [1, 2, 3, 4].filter(myMock);

  console.log(result);
  console.log(myMock(), myMock(), myMock(), myMock());
  console.log(myMock.mock);
});

// mocking modules
test('should fetch users', () => {
  const users = [
    {
      name: 'haha',
    },
  ];

  const res = { data: users };
  axios.get.mockResolvedValue(res);

  return Users.all().then(data => expect(data).toEqual(users));
});

// mock implementation
test('mock implementation', () => {
  foo.mockImplementation(() => 42);
  console.log('foo', foo());

  const myMockFn = jest
    .fn(() => 'default')
    .mockImplementationOnce(() => 'first call')
    .mockImplementationOnce(() => 'second call');
  console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());

  const myObj = {
    myMethod: jest.fn().mockReturnThis(),
  };
  expect(myObj.myMethod()).toEqual(myObj);
});


