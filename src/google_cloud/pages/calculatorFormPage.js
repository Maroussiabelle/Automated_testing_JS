import GoogleCloudComputeEngineForm from "../components/computeEngineForm.js";
import GoogleCloudCostDetailsComponent from "../components/costDetailsComponent.js";
import GoogleCloudEstimateShareDialog from "../components/estimateShareDialog.js";

export default class GoogleCloudCalculatorFormPage {
    constructor() {
        this.computeEngineForm = new GoogleCloudComputeEngineForm();
        this.costDetailsComponent = new GoogleCloudCostDetailsComponent();
        this.googleCloudEstimateShareDialog = new GoogleCloudEstimateShareDialog();
    }
}