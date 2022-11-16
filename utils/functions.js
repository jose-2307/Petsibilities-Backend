//const boom = require("@hapi/boom");


const pagination = (limit, offset, array) => {
  const resp = [];
  //ej. offset = 2 y limit = 5 con [1,2,3,4,5,6,7,8] =>  [3,4,5,6,7]
  for (let i = offset; i < array.length; i ++) {
    resp.push(array[i]);
    limit --;
    if (limit == 0) break;
  }
  return resp;
}

module.exports = {pagination}

