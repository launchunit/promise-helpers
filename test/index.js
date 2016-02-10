
const test = require('ava');
const Helpers = require('../');


test.serial('Validate Methods', t => {

  t.ok(typeof Helpers.resolve === 'function');
  t.ok(typeof Helpers.reject === 'function');
  t.ok(typeof Helpers.done === 'function');
});
