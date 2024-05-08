import BaseComponent from './baseComponent.js'

const selectors = {
  numberOfInstances: '//span[text()="Number of Instances"]/parent::span/span[@class="Kfvdz"]',
  machineType: '//span[text()="Machine type"]/parent::span/span[@class="Kfvdz"]',
  gpuModel: '//span[text()="GPU Model"]/parent::span/span[@class="Kfvdz"]',
  provisioningModel: '//span[text()="Provisioning Model"]/parent::span/span[@class="Kfvdz"]',
  operatingSystem: '//span[text()="Operating System / Software"]/parent::span/span[@class="Kfvdz"]',
  addGPUS: '//span[text()="Add GPUs"]/parent::span/span[@class="Kfvdz"]',
  numberOfGPUS: '//span[text()="Number of GPUs"]/parent::span/span[@class="Kfvdz"]',
  localSSD: '//span[text()="Local SSD"]/parent::span/span[@class="Kfvdz"]',
  region: '//span[text()="Region"]/parent::span/span[@class="Kfvdz"]',
  commitedUse: '//span[text()="Committed use discount options"]/parent::span/span[@class="Kfvdz"]'
}

export default class GoogleCloudCostEstimateSummaryComponent extends BaseComponent {
  constructor () {
    super('div.qBohdf.AlLELb')
  }

  /**
  * @param name {'numberOfInstances', 'machineType', 'gpuModel', 'provisioningModel', 'operatingSystem', 'addGPUS', 'numberOfGPUS', 'localSSD', 'region', 'commitedUse'}
  */
  summaryData (name) {
    return this.rootEl.$(selectors[name])
  }
}
