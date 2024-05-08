import BaseComponent from './baseComponent.js'

export default class GoogleCloudAddToEstimateDialog extends BaseComponent {
  constructor () {
    super('div.bwApif-P5QLlc[role="dialog"]')
  }

  get computeEngineCard () {
    return this.rootEl.$('//h2[text()="Compute Engine"]/ancestor::div[@class="VobRQb"]')
  }
}
