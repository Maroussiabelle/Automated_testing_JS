import {$} from "@wdio/globals";

export default class GoogleCloudTotalEstimatedCostComponent {
    get rootEl () {
        return $('div.MQQvHd')
    }

    get totalCost() {
        return this.rootEl.$('.n8xu5.Nh2Phe.D0aEmf')
    }
}