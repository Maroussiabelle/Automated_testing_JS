import {$} from "@wdio/globals";

export default class GoogleCloudCostEstimateSummaryComponent {
    get rootEl () {
        return $('div.qBohdf.AlLELb')
    }

    get numberOfInstances() {
        return this.rootEl.$('//span[text()="Number of Instances"]/parent::span/span[@class="Kfvdz"]')
    }

    get machineType() {
        return this.rootEl.$('//span[text()="Machine type"]/parent::span/span[@class="Kfvdz"]')
    }

    get gpuModel() {
        return this.rootEl.$('//span[text()="GPU Model"]/parent::span/span[@class="Kfvdz"]')
    }

    get provisioningModel() {
        return this.rootEl.$('//span[text()="Provisioning Model"]/parent::span/span[@class="Kfvdz"]')
    }

    get operatingSystem() {
        return this.rootEl.$('//span[text()="Operating System / Software"]/parent::span/span[@class="Kfvdz"]')
    }

    get addGPUS() {
        return this.rootEl.$('//span[text()="Add GPUs"]/parent::span/span[@class="Kfvdz"]')
    }

    get numberOfGPUS() {
        return this.rootEl.$('//span[text()="Number of GPUs"]/parent::span/span[@class="Kfvdz"]')
    }

    get localSSD() {
        return this.rootEl.$('//span[text()="Local SSD"]/parent::span/span[@class="Kfvdz"]')
    }

    get region() {
        return this.rootEl.$('//span[text()="Region"]/parent::span/span[@class="Kfvdz"]')
    }

    get commitedUse() {
        return this.rootEl.$('//span[text()="Committed use discount options"]/parent::span/span[@class="Kfvdz"]')
    }
}