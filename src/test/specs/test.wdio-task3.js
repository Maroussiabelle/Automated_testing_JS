import { $, browser } from '@wdio/globals'
import StartPage from '../../google_cloud/pages/startPage.js'
import { expect } from 'chai'

const googleStartPage = new StartPage()

async function clickSearchIcon () {
  await $('input.mb2a7b').click()
}

async function waitForSearchInputFieldDisplayed () {
  await $('input[name="q"]').waitForDisplayed()
}
async function searchforItem (searchItem) {
  await $('input[name="q"]').setValue(searchItem)
  await browser.keys(['Enter'])
}

async function clickFirstSearchResult () {
  await $('//a[@class="gs-title"]/b[text()="Google Cloud Pricing Calculator"]').click()
}

async function clickAddToEstimateButton () {
  await $('span.UywwFc-vQzf8d[jsname="V67aGc"]').click()
}

async function clickComputeEngine () {
  await $('//h2[text()="Compute Engine"]').click()
}

async function setNumberOfInstances (numberOfInstances) {
  await $('//div[contains(text(), "Number of Instances") and string-length() > 19]/ancestor::div[@class="QiFlid"]//input[@type="number"]')
    .click()
  await browser.keys(['Backspace', `${numberOfInstances}`])
}

async function setMachineType (model) {
  const selectMachineDropdown = $('div[jsname="kgDJk"]')
  await selectMachineDropdown.scrollIntoView({ block: 'center' })
  await selectMachineDropdown.click()
  await $(`li[data-value='${model}']`).click()
}

async function clickGPUSwitch () {
  const addGPUsSwitch = $('button[aria-label="Add GPUs"]')
  await addGPUsSwitch.scrollIntoView({ block: 'center' })
  await addGPUsSwitch.click()
}

async function selectGPUModel (gpuModel) {
  const selectGPU = $('//span[text()="GPU Model"]/ancestor::div[contains(@class, "O1htCb-H9tDt")]')
  await selectGPU.click()
  await $(`//span[@jsname="K4r5Ff" and text()="${gpuModel}"]/ancestor::li`).click()
}

async function selectRegion (region) {
  const selectGPU = $('//span[text()="Region"]/ancestor::div[contains(@class, "O1htCb-H9tDt")]')
  await selectGPU.click()
  await $(`//span[text()="${region}"]/ancestor::li`).click()
}

async function commitedUsage (period) {
  await $(`label.zT2df[for="${period}"]`).click()
}

async function clickShare () {
  const shareButton = await $('span[jsname="V67aGc"].FOBRw-vQzf8d')
  await shareButton.scrollIntoView({ block: 'center' })
  await shareButton.click()
}

async function openEstimateSummaryInNewTab () {
  await $('//a[text()="Open estimate summary"]').click()
}
describe('WebDriver Task 3 suite', () => {
  beforeEach(async () => {
    await googleStartPage.open()
  })

  it('Should open Google Cloud, search for "Google Cloud Platform Pricing Calculator, set properties and send price estimate to email', async () => {
    await clickSearchIcon()
    await waitForSearchInputFieldDisplayed()
    await searchforItem('Google Cloud Platform Pricing Calculator')
    await clickFirstSearchResult()
    await clickAddToEstimateButton()
    await clickComputeEngine()
    await setNumberOfInstances(4)
    await setMachineType('n1-standard-8')
    await clickGPUSwitch()
    await selectGPUModel('NVIDIA Tesla V100')
    await selectRegion('Netherlands (europe-west4)')
    await commitedUsage('1-year')
    await browser.pause(1000)
    const sumOnFormTab = await $('.gt0C8e.MyvX5d.D0aEmf').getHTML(false)
    await clickShare()
    await openEstimateSummaryInNewTab()

    await browser.switchWindow('Google Cloud Estimate Summary')

    const sumOnSummaryTab = await $('.n8xu5.Nh2Phe.D0aEmf').getHTML(false)
    const numberOfInstances = await $('//span[text()="Number of Instances"]/parent::span/span[@class="Kfvdz"]')
      .getHTML(false)
    const machineType = await $('//span[text()="Machine type"]/parent::span/span[@class="Kfvdz"]')
      .getHTML(false)
    const gpuModel = await $('//span[text()="GPU Model"]/parent::span/span[@class="Kfvdz"]')
      .getHTML(false)
    expect(sumOnFormTab).to.equal(sumOnSummaryTab)
    expect(numberOfInstances).to.equal('4')
    expect(machineType.startsWith('n1-standard-8')).to.be.true
    expect(gpuModel).to.equal('NVIDIA Tesla V100')
  })
})
