import BaseComponent from './baseComponent.js'

export default class GoogleCloudEstimateShareDialog extends BaseComponent {
  constructor () {
    super('div.bwApif-P5QLlc[role="dialog"]')
  }

  get openEstimateSummaryLink () {
    return this.rootEl.$('//a[text()="Open estimate summary"]')
  }
}
