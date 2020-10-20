////////////////////////////////////////
//            Why test?               //
//            ---------               //
//  - Saves time                      //
//  - Creates reliable software       //
//  - Gives flexibility to developers //
//    - Refactoring                   //
//    - Collaborating                 //
//    - Profiling                     //
//    - Peace of mind                 //
////////////////////////////////////////

const math = require('../src/math.js');

test('Should calculate total with tip', () => {
  const total = math.calculateTip(10, 0.3);
  expect(total).toBe(13);
});

test('Should calculate total with default tip', () => {
  const total = math.calculateTip(10);
  expect(total).toBe(12.5);
});

test('Should convert 32 F to 0 C', () => {
  const celsius = math.fahrenheitToCelsius(32);
  expect(celsius).toBe(0);
});

test('Should convert 0 C to 32 F', () => {
  const fahrenheit = math.celsiusToFahrenheit(0);
  expect(fahrenheit).toBe(32);
});

test('Async test demo', (done) => {
  setTimeout(() => {
    expect(1).toBe(2);
    done();
  }, 2000);
});

test('Should sum up two numbers', (done) => {
  math.add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

test('Should sum up two numbers async/await', async () => {
  const sum = await math.add(10, 22);
  expect(sum).toBe(32);
});
