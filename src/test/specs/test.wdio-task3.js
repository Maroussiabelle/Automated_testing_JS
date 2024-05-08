import { browser } from '@wdio/globals'
import GoogleCloudHomePage from '../../google_cloud/pages/homePage.js'
import { expect } from 'chai'
import GoogleCloudSearchResultsPage from "../../google_cloud/pages/searchResultsPage.js";
import GoogleCloudWelcomeToCalculatorPage from "../../google_cloud/pages/welcomeToCalculatorPage.js";
import GoogleCloudCalculatorFormPage from "../../google_cloud/pages/calculatorFormPage.js";
import GoogleCloudEstimateSummaryPage from "../../google_cloud/pages/estimateSummaryPage.js";

const googleCloudStartPage = new GoogleCloudHomePage()
const googleCloudSearchResultsPage = new GoogleCloudSearchResultsPage()
const googleCloudWelcomeToCalculatorPage = new GoogleCloudWelcomeToCalculatorPage()
const googleCloudCalculatorFormPage = new GoogleCloudCalculatorFormPage()
const googleCloudEstimateSummaryPage = new GoogleCloudEstimateSummaryPage()

async function searchForItem (searchItem) {
  await googleCloudStartPage.header.inputBox.setValue(searchItem)
  await browser.keys(['Enter'])
}

async function clickFirstSearchResult (searchResultTitle) {
  await googleCloudSearchResultsPage.searchResultsContainer.searchResult(searchResultTitle).click()
}

async function clickAddToEstimateButton () {
  await googleCloudWelcomeToCalculatorPage.welcomeToCalculatorComponent.addToEstimateButton.click()
}

async function clickComputeEngine () {
  await googleCloudWelcomeToCalculatorPage.addToEstimateDialog.computeEngineCard.click()
}

async function setNumberOfInstances (numberOfInstances) {
  await googleCloudCalculatorFormPage.computeEngineForm.numberOfInstancesInput.click()
  await browser.keys(['Backspace', `${numberOfInstances}`])
}

async function setMachineType (model) {
  await googleCloudCalculatorFormPage.computeEngineForm.selectMachineDropdown.click()
  await googleCloudCalculatorFormPage.computeEngineForm.machineModelOption(model).click()
}

async function clickGPUSwitch () {
  await googleCloudCalculatorFormPage.computeEngineForm.gpuSwitch.click()
}

async function selectGPUModel (gpuModel) {
  await googleCloudCalculatorFormPage.computeEngineForm.gpuModelDropdown.click()
  await googleCloudCalculatorFormPage.computeEngineForm.gpuModelOption(gpuModel).click()
}

async function selectLocalSSD (ssdType) {
  await googleCloudCalculatorFormPage.computeEngineForm.localSSDDropdown.click()
  await googleCloudCalculatorFormPage.computeEngineForm.ssdTypeOption(ssdType).click()
}

async function selectRegion (region) {
  await googleCloudCalculatorFormPage.computeEngineForm.regionDropdown.click()
  await googleCloudCalculatorFormPage.computeEngineForm.regionOption(region).click()
}

async function commitedUsage (period) {
  await googleCloudCalculatorFormPage.computeEngineForm.commitedUsageLabel(period).click()
}

async function waitForPriceRecalculation() {
  await googleCloudCalculatorFormPage.computeEngineForm.serviceCostUpdatedComponent.waitForDisplayed()
}

async function clickShare () {
  await googleCloudCalculatorFormPage.costDetailsComponent.shareButton.click()
}

async function openEstimateSummaryInNewTab () {
  await googleCloudCalculatorFormPage.googleCloudEstimateShareDialog.openEstimateSummaryLink.click()
}
describe('WebDriver Task 3 suite', () => {
  beforeEach(async () => {
    await googleCloudStartPage.open()
  })

  it('Should open Google Cloud, search for "Google Cloud Platform Pricing Calculator, set properties and send price estimate to email', async () => {
    await googleCloudStartPage.header.icon.click()
    await searchForItem('Google Cloud Platform Pricing Calculator')
    await clickFirstSearchResult('Google Cloud Pricing Calculator')
    await clickAddToEstimateButton()
    await clickComputeEngine()
    await setNumberOfInstances(4)
    await setMachineType('n1-standard-8')
    await clickGPUSwitch()
    await selectGPUModel('NVIDIA Tesla V100')
    await selectLocalSSD('2x375 GB')
    await selectRegion('Netherlands (europe-west4)')
    await commitedUsage('1 year')
    await waitForPriceRecalculation()
    const sumOnFormTab = await googleCloudCalculatorFormPage.costDetailsComponent.estimatedCostLabel.getHTML(false)
    await clickShare()
    await openEstimateSummaryInNewTab()

    await browser.switchWindow('Google Cloud Estimate Summary')

    const sumOnSummaryTab = await googleCloudEstimateSummaryPage.totalEstimatedCostComponent.totalCost.getHTML(false)
    const machineType = await googleCloudEstimateSummaryPage.costEstimateSummaryComponent.machineType.getHTML(false)
    const gpuModel = await googleCloudEstimateSummaryPage.costEstimateSummaryComponent.gpuModel.getHTML(false)
    const numberOfGPUS = await googleCloudEstimateSummaryPage.costEstimateSummaryComponent.numberOfGPUS.getHTML(false)
    const localSSD = await googleCloudEstimateSummaryPage.costEstimateSummaryComponent.localSSD.getHTML(false)
    const numberOfInstances = await googleCloudEstimateSummaryPage.costEstimateSummaryComponent.numberOfInstances.getHTML(false)
    const operatingSystem = await googleCloudEstimateSummaryPage.costEstimateSummaryComponent.operatingSystem.getHTML(false)
    const provisioningModel = await googleCloudEstimateSummaryPage.costEstimateSummaryComponent.provisioningModel.getHTML(false)
    const addGPUS = await googleCloudEstimateSummaryPage.costEstimateSummaryComponent.addGPUS.getHTML(false)
    const region = await googleCloudEstimateSummaryPage.costEstimateSummaryComponent.region.getHTML(false)
    const commitedUse = await googleCloudEstimateSummaryPage.costEstimateSummaryComponent.commitedUse.getHTML(false)

    expect(sumOnFormTab).to.equal(sumOnSummaryTab)
    expect(machineType.startsWith('n1-standard-8')).to.be.true
    expect(gpuModel).to.equal('NVIDIA Tesla V100')
    expect(numberOfGPUS).to.equal('1')
    expect(localSSD).to.equal('2x375 GB')
    expect(numberOfInstances).to.equal('4')
    expect(operatingSystem).to.equal('Free: Debian, CentOS, CoreOS, Ubuntu or BYOL (Bring Your Own License)')
    expect(provisioningModel).to.equal('Regular')
    expect(addGPUS).to.equal('true')
    expect(region).to.equal('Netherlands (europe-west4)')
    expect(commitedUse).to.equal('1 year')
  })
})
