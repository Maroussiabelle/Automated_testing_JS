import {$} from "@wdio/globals";

export default class GoogleCloudAddToEstimateDialog {
    get rootEl () {
        return $('div.bwApif-P5QLlc[role="dialog"]')
    }

    get computeEngineCard(){
        return this.rootEl.$('//h2[text()="Compute Engine"]/ancestor::div[@class="VobRQb"]')
    }
}