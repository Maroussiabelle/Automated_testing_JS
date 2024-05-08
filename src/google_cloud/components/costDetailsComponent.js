import {$} from "@wdio/globals";

export default class GoogleCloudCostDetailsComponent {
    get rootEl () {
        return $('div.C7J75c')
    }

    get estimatedCostLabel() {
        return this.rootEl.$('.gt0C8e.MyvX5d.D0aEmf')
    }

    get shareButton() {
        return this.rootEl.$('span[jsname="V67aGc"].FOBRw-vQzf8d')
    }
}