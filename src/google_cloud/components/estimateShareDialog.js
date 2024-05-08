import {$} from "@wdio/globals";

export default class GoogleCloudEstimateShareDialog {
    get rootEl () {
        return $('div.bwApif-P5QLlc[role="dialog"]')
    }

    get openEstimateSummaryLink() {
        return this.rootEl.$('//a[text()="Open estimate summary"]')
    }
}