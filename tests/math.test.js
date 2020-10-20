const { Test } = require('tslint');

test('Hello World!', () => {});

test('This should fail', () => {
  throw new Error('Failure!');
});

//
// Why test?
//
// - Saves time
// - Creates reliable software
// - Gives flexibility to developers
//   - Refactoring
//   - Collaborating
//   - Profiling
// - Peace of mind
