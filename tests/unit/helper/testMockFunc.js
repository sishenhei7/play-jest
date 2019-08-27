import axios from 'axios';

function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

class Users {
  static all() {
    return axios.get('/users.json').then(res => res.data);
  }
}

export {
  forEach,
  Users,
};
