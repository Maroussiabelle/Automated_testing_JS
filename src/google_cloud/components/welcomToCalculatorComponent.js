import BaseComponent from './baseComponent.js'

export default class GoogleCloudWelcomeToCalculatorComponent extends BaseComponent {
  constructor () {
    super('div.kyx3Tb.AlLELb')
  }

  get addToEstimateButton () {
    return this.rootEl.$('//span[text()="Add to estimate"]')
  }
}
