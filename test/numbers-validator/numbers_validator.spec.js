// Importing the 'expect' function from the 'chai' library to perform assertions
// Importing the NumbersValidator class from the relative path '../app/numbers-validator'
// so we can test its methods.

import { expect } from 'chai'
import NumbersValidator from '../../app/numbers_validator.js'

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

  describe('NumbersValidator', () => {
    // Test suite for getEvenNumbersFromArray method
    describe('getEvenNumbersFromArray', () => {
      // Test case 1: Test with valid input array containing only even numbers
      it('should return an array of even numbers', () => {
        const input = [2, 4, 6, 8]
        const expectedOutput = [2, 4, 6, 8]
        expect(validator.getEvenNumbersFromArray(input)).to.be.eql(expectedOutput)
      })

      // Test case 2: Test with valid input array containing a mix of even and odd numbers
      it('should return an array of even numbers when input contains a mix of even and odd numbers', () => {
        const input = [1, 2, 3, 4, 5, 6]
        const expectedOutput = [2, 4, 6]
        expect(validator.getEvenNumbersFromArray(input)).to.eql(expectedOutput)
      })

      // Test case 3: Test with an empty array
      it('should return an empty array for an empty input array', () => {
        const input = []
        const expectedOutput = []
        expect(validator.getEvenNumbersFromArray(input)).to.eql(expectedOutput)
      })

      // Test case 4: Test with an array containing non-numeric values
      it('should throw an error for an array containing non-numeric values', () => {
        const input = [1, '2', 3, 'four', 5]
        expect(() => validator.getEvenNumbersFromArray(input)).to.throw(/not an array of "Numbers"/)
      })

      // Test case 5: Test with a non-array input
      it('should throw an error for a non-array input', () => {
        const input = 'not an array'
        expect(() => validator.getEvenNumbersFromArray(input)).to.throw(/not an array of "Numbers"/)
      })
    })
  })
  describe('isAllNumbers', () => {
    // Test with an array containing only numbers
    it('should return true for an array containing only numbers', () => {
      const validator = new NumbersValidator()
      const input = [1, 2, 3, 4, 5]
      expect(validator.isAllNumbers(input)).to.be.equal(true)
    })

    // Test with an array containing non-number values
    it('should return false for an array containing non-number values', () => {
      const validator = new NumbersValidator()
      const input = [1, '2', 3, 'four', 5]
      expect(validator.isAllNumbers(input)).to.be.equal(false)
    })

    // Test with a non-array input
    it('should throw an error for a non-array input', () => {
      const validator = new NumbersValidator()
      const input = 'not an array'
      expect(() => validator.isAllNumbers(input)).to.throw()
    })
  })
  describe('isInteger', () => {
    // Test with an integer
    it('should return true for an integer', () => {
      const validator = new NumbersValidator()
      const input = 5
      expect(validator.isInteger(input)).to.be.equal(true)
    })

    // Test with a non-integer number
    it('should return false for a non-integer number', () => {
      const validator = new NumbersValidator()
      const input = 5.5
      expect(validator.isInteger(input)).to.be.equal(false)
    })

    // Test with a non-number value
    it('should throw an error for a non-number value', () => {
      const validator = new NumbersValidator()
      const input = 'not a number'
      expect(() => validator.isInteger(input)).to.throw()
    })
  })
})
