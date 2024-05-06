// Importing the 'expect' function from the 'chai' library to perform assertions
// Importing the NumbersValidator class from the relative path '../app/numbers-validator'
// so we can test its methods.

import { expect } from 'chai'
import NumbersValidator from '../../../app/numbers_validator.js'

// Importing functions 'describe', 'beforeEach', 'afterEach' and 'it' from 'mocha' which is a test framework.
// const { describe, beforeEach, afterEach, it } = require('mocha')
import { describe, beforeEach, afterEach, it } from 'mocha'

// 'describe' is used to group related tests together into a test suite.
// Here, it describes a suite of tests for the 'isNumberEven' method of NumbersValidator class.
describe('isNumberEven', function () {
  // Declaring a variable 'validator' outside of the 'beforeEach' and 'it' blocks
  // to make it accessible throughout this describe block.
  let validator

  // 'beforeEach' is a hook that runs before each test ('it' block) within this 'describe' block.
  // It's usually used for setting up the test environment.
  beforeEach(function () {
    // Instantiates a new NumbersValidator object before each test and assigns it to 'validator'
    validator = new NumbersValidator()
  })

  // 'afterEach' is a hook that runs after each test. It is often used for cleanup activities.
  afterEach(function () {
    // Sets the validator variable to null to clean up memory after each test
    validator = null
  })

  // 'it' is used for individual test cases - it includes the actual test.
  // The string argument describes what the test should do.
  it('should return true if number is even', function () {
    // Using 'expect' to assert that the 'isNumberEven' method returns true when
    // passed the even number 4. The '.to.be.equal(true)' is the actual assertion check.
    expect(validator.isNumberEven(4)).to.be.equal(true)
  })

  // Additional tests would follow for different test cases, such as testing if an odd number
  it('should return true if number is odd', function () {
    // Using 'expect' to assert that the 'isNumberOdd' method returns true when
    // passed the odd number 5. The '.to.be.equal(false)' is the actual assertion check.
    expect(validator.isNumberEven(5)).to.be.equal(false)
  })

  // returns false or if passing a non-number throws an error.
  it('should throw an error when provided a string', () => {
    expect(() => {
      validator.isNumberEven('4')
    }).to.throw('[4] is not of type "Number" it is of type "string"')
  })
})
