/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise       *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Return Promise object that is resolved with string value === 'Hooray!!! She said "Yes"!',
 * if boolean value === true is passed, resolved with string value === 'Oh no, she said "No".',
 * if boolean value === false is passed, and rejected
 * with error message === 'Wrong parameter is passed! Ask her again.',
 * if is not boolean value passed
 *
 * @param {boolean} isPositiveAnswer
 * @return {Promise}
 *
 * @example
 *    const p1 = willYouMarryMe(true);
 *    p1.then(answer => console.log(answer)) // 'Hooray!!! She said "Yes"!'
 *
 *    const p2 = willYouMarryMe(false);
 *    p2.then(answer => console.log(answer)) // 'Oh no, she said "No".';
 *
 *    const p3 = willYouMarryMe();
 *    p3.then(answer => console.log(answer))
 *      .catch((error) => console.log(error.message)) // 'Error: Wrong parameter is passed!
 *                                                    //  Ask her again.';
 */

function willYouMarryMe(isPositiveAnswer) {
  return new Promise((res, rej) => ((typeof isPositiveAnswer === 'boolean')
    ? res(isPositiveAnswer ? 'Hooray!!! She said "Yes"!' : 'Oh no, she said "No".')
    : rej(Error('Wrong parameter is passed! Ask her again.'))));
}

/**
 * Return Promise object that should be resolved with array containing plain values.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(3), Promise.resolve(12)]
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [1, 2, 3]
 *    })
 *
 */
function processAllPromises(array) {
  return Promise.all(array).then(
    (values) => values,
    (error) => error.message,
  );
}

/**
 * Return Promise object that should be resolved with value received from
 * Promise object that will be resolved first.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [
 *      Promise.resolve('first'),
 *      new Promise(resolve => setTimeout(() => resolve('second'), 500)),
 *    ];
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [first]
 *    })
 *
 */
function getFastestPromise(array) {
  return Promise.race(array)
    .then((values) => values);
}

/**
 * Return Promise object that should be resolved with value that is
 * a result of action with values of all the promises that exists in array.
 * If some of promise is rejected you should catch it and process the next one.
 *
 * @param {Promise[]} array
 * @param {Function} action
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
 *    const p = chainPromises(promises, (a, b) => a + b);
 *    p.then((res) => {
 *      console.log(res) // => 6
 *    });
 *
 */
function chainPromises(array, action) {
  const result = [];
  const errors = [];

  async function getRes(arr, i = 0) {
    if (i === arr.length) return result;
    try {
      const res = await arr[i];
      result.push(res);
    } catch (err) { errors.push(err); }
    await getRes(arr, i + 1);
    return result;
  }
  return new Promise((resolve) => {
    getRes(array).then((final) => resolve(final.reduce(action)));
  });


  // async function getActionResult(arrayIncome) {
  //   const arr = arrayIncome.reduce((res1, item) => {
  //     if (item.status === 'fulfilled') {
  //       res1.push(item.value);
  //     }
  //     return res1;
  //   }, []);
  //   let result = action(arr[0], arr[1]);
  //   for (let i = 2; i < arr.length; i += 1) {
  //     result = action(result, arr[i]);
  //   }
  //   return result;
  // }
  // const fine = getActionResult(array);
  // return Promise(resolve => resolve(fine)
}

module.exports = {
  willYouMarryMe,
  processAllPromises,
  getFastestPromise,
  chainPromises,
};
