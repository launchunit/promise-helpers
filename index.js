
'use strict';


function resolve(data) {
  return new Promise(resolve => {
    return resolve(data);
  });
};

function reject(data) {
  return new Promise((resolve, reject) => {
    return reject(data);
  });
};

function done(err) {
  if (err instanceof Error)
    return reject(err);

  return resolve(err);
};


/**
 * Expose Helpers
 *
 * @public
 */
module.exports = { resolve, reject, done };
