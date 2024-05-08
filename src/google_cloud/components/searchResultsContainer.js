import {$} from "@wdio/globals";

export default class GoogleCloudSearchResultsContainer {
    get rootEl () {
        return $('div.catalog-results-container')
    }

    searchResult (searchResultTitle) {
        return this.rootEl.$(`//a[@class="gs-title"]/b[text()="${searchResultTitle}"]`)
    }
}