import BaseComponent from './baseComponent.js'

export default class GoogleCloudComputeEngineForm extends BaseComponent {
  constructor () {
    super('div.kyx3Tb.AlLELb')
  }

  get numberOfInstancesInput () {
    return this.rootEl.$('//div[contains(text(), "Number of Instances") and string-length() > 19]/ancestor::div[@class="QiFlid"]//input[@type="number"]')
  }

  get selectMachineDropdown () {
    return this.rootEl.$('div[jsname="kgDJk"]')
  }

  machineModelOption (machineModel) {
    return this.selectMachineDropdown.$(`li[data-value='${machineModel}']`)
  }

  get gpuSwitch () {
    return this.rootEl.$('button[aria-label="Add GPUs"]')
  }

  get gpuModelDropdown () {
    return this.rootEl.$('//span[text()="GPU Model"]/ancestor::div[contains(@class, "O1htCb-H9tDt")]')
  }

  gpuModelOption (gpuModel) {
    return this.gpuModelDropdown.$(`//span[@jsname="K4r5Ff" and text()="${gpuModel}"]/ancestor::li`)
  }

  get localSSDDropdown () {
    return this.rootEl.$('//span[text()="Local SSD"]/ancestor::div[contains(@class, "O1htCb-H9tDt")]')
  }

  ssdTypeOption (ssdType) {
    return this.localSSDDropdown.$(`//span[@jsname="K4r5Ff" and text()="${ssdType}"]/ancestor::li`)
  }

  get regionDropdown () {
    return this.rootEl.$('//span[text()="Region"]/ancestor::div[contains(@class, "O1htCb-H9tDt")]')
  }

  regionOption (region) {
    return this.regionDropdown.$(`//span[text()="${region}"]/ancestor::li`)
  }

  commitedUsageLabel (period) {
    return this.rootEl.$(`//label[text()="${period}"]`)
  }

  get serviceCostUpdatedComponent () {
    return this.rootEl.$('//div[@class="Z7Qi9d HY0Uh" and contains(text(), "Service cost updated")]')
  }
}
