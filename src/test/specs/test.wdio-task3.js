import { browser } from '@wdio/globals'
import { expect } from 'chai'
import { pages } from '../../google_cloud/pages/index.js'

async function searchForItem (searchItem) {
  await pages('start').header.inputBox.setValue(searchItem)
  await browser.keys(['Enter'])
}

async function clickFirstSearchResult (searchResultTitle) {
  await pages('searchResults').searchResultsContainer.searchResult(searchResultTitle).click()
}

async function clickAddToEstimateButton () {
  await pages('welcomeToCalculator').welcomeToCalculatorComponent.addToEstimateButton.click()
}

async function clickComputeEngine () {
  await pages('welcomeToCalculator').addToEstimateDialog.computeEngineCard.click()
}

async function setNumberOfInstances (numberOfInstances) {
  await pages('calculatorForm').computeEngineForm.numberOfInstancesInput.click()
  await browser.keys(['Backspace', `${numberOfInstances}`])
}

async function setMachineType (model) {
  await pages('calculatorForm').computeEngineForm.selectMachineDropdown.click()
  await pages('calculatorForm').computeEngineForm.machineModelOption(model).click()
}

async function clickGPUSwitch () {
  await pages('calculatorForm').computeEngineForm.gpuSwitch.click()
}

async function selectGPUModel (gpuModel) {
  await pages('calculatorForm').computeEngineForm.gpuModelDropdown.click()
  await pages('calculatorForm').computeEngineForm.gpuModelOption(gpuModel).click()
}

async function selectLocalSSD (ssdType) {
  await pages('calculatorForm').computeEngineForm.localSSDDropdown.click()
  await pages('calculatorForm').computeEngineForm.ssdTypeOption(ssdType).click()
}

async function selectRegion (region) {
  await pages('calculatorForm').computeEngineForm.regionDropdown.click()
  await pages('calculatorForm').computeEngineForm.regionOption(region).click()
}

async function commitedUsage (period) {
  await pages('calculatorForm').computeEngineForm.commitedUsageLabel(period).click()
}

async function waitForPriceRecalculation () {
  await pages('calculatorForm').computeEngineForm.serviceCostUpdatedComponent.waitForDisplayed()
}

async function clickShare () {
  await pages('calculatorForm').costDetailsComponent.shareButton.click()
}

async function openEstimateSummaryInNewTab () {
  await pages('calculatorForm').googleCloudEstimateShareDialog.openEstimateSummaryLink.click()
}
describe('WebDriver Task 3 suite', () => {
  beforeEach(async () => {
    await pages('start').open()
    await pages('start').setCookiesLocalStorageItem()
  })

  it('Should open Google Cloud, search for "Google Cloud Platform Pricing Calculator, set properties and verify summary', async () => {
    await pages('start').header.icon.click()
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
    const sumOnFormTab = await pages('calculatorForm').costDetailsComponent.estimatedCostLabel.getHTML(false)
    await clickShare()
    await openEstimateSummaryInNewTab()

    await browser.switchWindow('Google Cloud Estimate Summary')

    const sumOnSummaryTab = await pages('estimateSummary').totalEstimatedCostComponent.totalCost.getHTML(false)
    const machineType = await pages('estimateSummary').costEstimateSummaryComponent.summaryData('machineType').getHTML(false)
    const gpuModel = await pages('estimateSummary').costEstimateSummaryComponent.summaryData('gpuModel').getHTML(false)
    const numberOfGPUS = await pages('estimateSummary').costEstimateSummaryComponent.summaryData('numberOfGPUS').getHTML(false)
    const localSSD = await pages('estimateSummary').costEstimateSummaryComponent.summaryData('localSSD').getHTML(false)
    const numberOfInstances = await pages('estimateSummary').costEstimateSummaryComponent.summaryData('numberOfInstances').getHTML(false)
    const operatingSystem = await pages('estimateSummary').costEstimateSummaryComponent.summaryData('operatingSystem').getHTML(false)
    const provisioningModel = await pages('estimateSummary').costEstimateSummaryComponent.summaryData('provisioningModel').getHTML(false)
    const addGPUS = await pages('estimateSummary').costEstimateSummaryComponent.summaryData('addGPUS').getHTML(false)
    const region = await pages('estimateSummary').costEstimateSummaryComponent.summaryData('region').getHTML(false)
    const commitedUse = await pages('estimateSummary').costEstimateSummaryComponent.summaryData('commitedUse').getHTML(false)

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
