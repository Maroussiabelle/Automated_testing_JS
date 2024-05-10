import { browser } from '@wdio/globals'
import { expect } from 'chai'
import { pages } from '../../google_cloud/pages/index.js'
import { CHEAP_ENGINE_DATA } from '../data/cheap-compute-engine-data.js'
import { EXPENSIVE_ENGINE_DATA } from '../data/expensive-compute-engine-data.js'

async function searchForItem (searchItem) {
  await pages('start').header.searchIcon.click()
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
  await pages('calculatorForm').computeEngineForm.selectedRegion(region).waitForDisplayed()
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
    await browser.maximizeWindow()
    await pages('start').open()
    await pages('start').setCookiesLocalStorageItem()
  })

  it('Should open Google Cloud page @smoke', async () => {
    await searchForItem('Google Cloud Platform Pricing Calculator')
    await clickFirstSearchResult('Google Cloud Pricing Calculator')
  })

  it('Should calculate Google Cloud cost - cheap engine', async () => {
    const sumOnFormTab = await fillForm(CHEAP_ENGINE_DATA)
    await browser.switchWindow('Google Cloud Estimate Summary')

    const actualSummaryData = await getActualSummaryData(CHEAP_ENGINE_DATA)

    assertSummaryData(CHEAP_ENGINE_DATA, { ...actualSummaryData, sumOnFormTab })
  })

  it('Should calculate Google Cloud cost - expensive engine', async () => {
    const sumOnFormTab = await fillForm(EXPENSIVE_ENGINE_DATA)
    await browser.switchWindow('Google Cloud Estimate Summary')

    const actualSummaryData = await getActualSummaryData(EXPENSIVE_ENGINE_DATA)

    assertSummaryData(EXPENSIVE_ENGINE_DATA, { ...actualSummaryData, sumOnFormTab })
  })

  async function fillForm (inputData) {
    await searchForItem('Google Cloud Platform Pricing Calculator')
    await clickFirstSearchResult('Google Cloud Pricing Calculator')
    await clickAddToEstimateButton()
    await clickComputeEngine()
    await setNumberOfInstances(inputData.numberOfInstances)
    await setMachineType(inputData.machineType)
    if (inputData.addGPUs === 'true') {
      await clickGPUSwitch()
      await selectGPUModel(inputData.gpuModel)
    }
    await selectLocalSSD(inputData.localSSD)
    await selectRegion(inputData.region)
    await commitedUsage(inputData.commitedUse)
    await waitForPriceRecalculation()
    const sumOnFormTab = await pages('calculatorForm').costDetailsComponent.estimatedCostLabel.getText()
    await clickShare()
    await openEstimateSummaryInNewTab()

    return sumOnFormTab
  }

  async function getActualSummaryData (inputData) {
    const result = {
      sumOnSummaryTab: await pages('estimateSummary').totalEstimatedCostComponent.totalCost.getText(),
      machineType: await pages('estimateSummary').costEstimateSummaryComponent.summaryData('machineType').getText(),
      localSSD: await pages('estimateSummary').costEstimateSummaryComponent.summaryData('localSSD').getText(),
      numberOfInstances: await pages('estimateSummary').costEstimateSummaryComponent.summaryData('numberOfInstances').getText(),
      operatingSystem: await pages('estimateSummary').costEstimateSummaryComponent.summaryData('operatingSystem').getText(),
      provisioningModel: await pages('estimateSummary').costEstimateSummaryComponent.summaryData('provisioningModel').getText(),
      addGPUS: await pages('estimateSummary').costEstimateSummaryComponent.summaryData('addGPUS').getText(),
      region: await pages('estimateSummary').costEstimateSummaryComponent.summaryData('region').getText(),
      commitedUse: await pages('estimateSummary').costEstimateSummaryComponent.summaryData('commitedUse').getText()
    }
    if (inputData.addGPUs !== 'true') {
      return result
    }

    return {
      ...result,
      gpuModel: await pages('estimateSummary').costEstimateSummaryComponent.summaryData('gpuModel').getText(),
      numberOfGPUS: await pages('estimateSummary').costEstimateSummaryComponent.summaryData('numberOfGPUS').getText()
    }
  }

  function assertSummaryData (inputData, actualData) {
    expect(actualData.sumOnSummaryTab).to.equal(inputData.totalCostPermonth)
    expect(actualData.sumOnSummaryTab).to.equal(actualData.sumOnFormTab)
    expect(actualData.machineType.startsWith(inputData.machineType)).to.be.true
    expect(actualData.gpuModel).to.equal(inputData.gpuModel)
    expect(actualData.numberOfGPUS).to.equal(inputData.numberOfGPUS)
    expect(actualData.localSSD).to.equal(inputData.localSSD)
    expect(actualData.numberOfInstances).to.equal(inputData.numberOfInstances)
    expect(actualData.operatingSystem).to.equal(inputData.operatingSystem)
    expect(actualData.provisioningModel).to.equal(inputData.provisioningModel)
    expect(actualData.addGPUS).to.equal(inputData.addGPUs)
    expect(actualData.region).to.equal(inputData.region)
    expect(actualData.commitedUse).to.equal(inputData.commitedUse)
  }
})
