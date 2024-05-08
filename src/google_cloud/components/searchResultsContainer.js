import BaseComponent from './baseComponent.js'

export default class GoogleCloudSearchResultsContainer extends BaseComponent {
  constructor () {
    super('div.catalog-results-container')
  }

  searchResult (searchResultTitle) {
    return this.rootEl.$(`//a[@class="gs-title"]/b[text()="${searchResultTitle}"]`)
  }
}
