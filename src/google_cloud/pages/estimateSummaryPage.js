import GoogleCloudTotalEstimatedCostComponent from '../components/totalEstimatedCostComponent.js'
import GoogleCloudCostEstimateSummaryComponent from '../components/costEstimateSummaryComponent.js'

export default class GoogleCloudEstimateSummaryPage {
  constructor () {
    this.totalEstimatedCostComponent = new GoogleCloudTotalEstimatedCostComponent()
    this.costEstimateSummaryComponent = new GoogleCloudCostEstimateSummaryComponent()
  }
}
