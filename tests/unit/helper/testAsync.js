const mockFetchData = (cb) => {
  setTimeout(() => {
    const data = {
      a: 1
    };
    cb(data);
  }, 1000);
};

const mockPromise = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('mock promise!');
  }, 200);
});

const mockPromiseReject = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('error!');
  }, 200);
});

module.exports = {
  mockFetchData,
  mockPromise,
  mockPromiseReject,
};
