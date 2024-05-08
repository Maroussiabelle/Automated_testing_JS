import GoogleCloudWelcomeToCalculatorComponent from "../components/welcomToCalculatorComponent.js";
import GoogleCloudAddToEstimateDialog from "../components/addToEstimateDialog.js";

export default class GoogleCloudWelcomeToCalculatorPage {
    constructor() {
        this.welcomeToCalculatorComponent = new GoogleCloudWelcomeToCalculatorComponent();
        this.addToEstimateDialog = new GoogleCloudAddToEstimateDialog()
    }
}