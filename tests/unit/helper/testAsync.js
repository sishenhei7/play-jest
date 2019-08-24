const mockFetchData = (cb) => {
  setTimeout(() => {
    const data = {
      a: 1
    };
    cb(data);
  }, 1000);
};

module.exports = mockFetchData;
