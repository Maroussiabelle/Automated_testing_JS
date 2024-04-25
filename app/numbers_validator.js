// Define a class named NumbersValidator
class NumbersValidator {
  // Method to check if a number is even
  // @param {Number} number - The number to be checked
  // @return {Boolean} - Returns true if the number is even, false otherwise
  isNumberEven (number) {
    // Determine the type of the passed argument
    const typeOfVariable = typeof number

    // If the type is not number, throw an error
    if (typeOfVariable !== 'number') {
      throw new Error(`[${number}] is not of type "Number" it is of type "${typeOfVariable}"`)
    } else {
      // If it's a number, return true if it's even (remainder of division by 2 is zero)
      return number % 2 === 0
    }
  }

  // Method to extract even numbers from an array
  // @param {Array<Number>} arrayOfNumbers - The array containing numbers to be checked
  // @return {Array<Number>} - An array of even numbers
  getEvenNumbersFromArray (arrayOfNumbers) {
    // Check if the input is an array and if every item is of type number
    if (Array.isArray(arrayOfNumbers) && arrayOfNumbers.every(item => typeof item === 'number')) {
      // Use the filter method to apply isNumberEven on each element and return an array of even numbers
      return arrayOfNumbers.filter(this.isNumberEven)
    }
    // If the input is not an array of numbers, throw an error
    throw new Error(`[${arrayOfNumbers}] is not an array of "Numbers"`)
  }

  // Method to check if all elements in an array are numbers
  // @param {Array<Number>} arrayOfNumbers - The array to be checked
  // @return {Boolean} - Returns true if all elements are numbers, false otherwise
  isAllNumbers (arrayOfNumbers) {
    // Check if the argument is an array
    if (!Array.isArray(arrayOfNumbers)) {
      throw new Error(`[${arrayOfNumbers}] is not an array`)
    }
    // Return true if every element in the array is of type number
    return arrayOfNumbers.every(n => typeof n === 'number')
  }

  // Method to check if a value is an integer
  // @param {Number} n - The value to be checked
  // @return {Boolean} - Returns true if the value is an integer, false otherwise
  isInteger (n) {
    // If the type of n is not number, throw an error
    if (typeof n !== 'number') {
      throw new Error(`[${n}] is not a number`)
    }
    // Return true if n is an integer
    return Number.isInteger(n)
  }
}

// Export the NumbersValidator class to be used in other modules
// module.exports = NumbersValidator
export default NumbersValidator
