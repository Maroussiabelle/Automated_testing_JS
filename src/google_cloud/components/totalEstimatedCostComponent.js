import BaseComponent from './baseComponent.js'

export default class GoogleCloudTotalEstimatedCostComponent extends BaseComponent {
  constructor () {
    super('div.MQQvHd')
  }

  get totalCost () {
    return this.rootEl.$('.n8xu5.Nh2Phe.D0aEmf')
  }
}
