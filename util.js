// TODO: Maybe we put global utility functions and overrides here?

module.exports = {
  isEmpty(obj) {
    return !obj || (Object.keys(obj).length === 0 && obj.constructor === Object);
  },

  promiseSerial(funcs) {
    return funcs.reduce((promise, func) =>
      promise.then(result => func().then(Array.prototype.concat.bind(result))),
      Promise.resolve([]));
  }
};