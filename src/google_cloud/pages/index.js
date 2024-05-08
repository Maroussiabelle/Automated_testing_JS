import GoogleCloudHomePage from './homePage.js'
import GoogleCloudSearchResultsPage from './searchResultsPage.js'
import GoogleCloudWelcomeToCalculatorPage from './welcomeToCalculatorPage.js'
import GoogleCloudCalculatorFormPage from './calculatorFormPage.js'
import GoogleCloudEstimateSummaryPage from './estimateSummaryPage.js'

const items = {
  start: new GoogleCloudHomePage(),
  searchResults: new GoogleCloudSearchResultsPage(),
  welcomeToCalculator: new GoogleCloudWelcomeToCalculatorPage(),
  calculatorForm: new GoogleCloudCalculatorFormPage(),
  estimateSummary: new GoogleCloudEstimateSummaryPage()
}

/**
 * @param name {'start', 'searchResults', 'welcomeToCalculator', 'calculatorForm', 'estimateSummary'}
 * @returns {GoogleCloudHomePage | GoogleCloudSearchResultsPage | GoogleCloudWelcomeToCalculatorPage | GoogleCloudCalculatorFormPage | GoogleCloudEstimateSummaryPage}
 */
export function pages (name) {
  return items[name]
}
