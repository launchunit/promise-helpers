
'use strict';

/**
 * Constants
 */
const MONGO_DUPLICATE_REGEX = /index:\s*.+?\.\$(\S*)\s*dup key:\s*\{(.*?)\}/;


/**
 * @params {Object} data (Required)
 *
 * @return {Promise}
 * @public
 */
exports.resolve = data => {
  return new Promise(resolve => {
    return resolve(data);
  });
};


/**
 * @params {Object} data (Required)
 *
 * @return {Promise}
 * @public
 */
exports.reject = data => {
  return new Promise((resolve, reject) => {
    return reject(data);
  });
};


/**
 * @params {Object} data (Required)
 *
 * @return {Promise}
 * @public
 */
exports.done = err => {

  if (err instanceof Error) {
    return exports.reject(err);
  }

  return exports.resolve(err);
};


/**
 * @params {Object} data (Required)
 *
 * @return {Promise}
 * @public
 */
exports.doneMongo = err => {

  if (err instanceof Error) {

    // Mongo Unique Error
    // https://github.com/matteodelabre/mongoose-beautiful-unique-validation/blob/master/index.js#L109
    if (err.name === 'MongoError' &&
        (err.code === 11000 || err.code === 11001)) {

      const matches = err.message.match(MONGO_DUPLICATE_REGEX);

      if (matches && matches[1]) {

        const Err = {
          path: matches[1].substring(0, matches[1].lastIndexOf('_')),
          type: 'string.duplicate',
        };

        Err.message = Err.path === 'email'
          ? 'Account already exists for this email address.'
          : `${Err.path} already exists, try something else.`;

        // Make It Compatiable with Joi Error
        return exports.resolve({ error: [ Err ] });
      }
    }

    return exports.reject(err);
  }

  return exports.resolve(err);
};
