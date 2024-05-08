import {$} from "@wdio/globals";

export default class GoogleCloudWelcomeToCalculatorComponent {
    get rootEl () {
        return $('div.kyx3Tb.AlLELb')
    }

    get addToEstimateButton() {
        return this.rootEl.$('//span[text()="Add to estimate"]')
    }
}