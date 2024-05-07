import { $, browser } from '@wdio/globals'
import StartPage from '../../google_cloud/pages/startPage.js'

const googleStartPage = new StartPage()

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

describe('WebDriver Task 3 suite', () => {
  beforeEach(async () => {
    await googleStartPage.open()
  })

  it('Should open Google Cloud, search for "Google Cloud Platform Pricing Calculator, set properties and send price estimate to email', async () => {
    const searchIcon = await $('input.mb2a7b')
    await searchIcon.click()

    // Wait for the search input field to become visible and interactable
    const searchInput = await $('input[name="q"]')
    await searchInput.waitForDisplayed()

    // Enter "Google Cloud Platform Pricing Calculator" into the search field
    await searchInput.setValue('Google Cloud Platform Pricing Calculator')

    // Press Enter key
    await browser.keys(['Enter'])
    await $('div.gs-title > a.gs-title > b').click()
    await $('span.UywwFc-vQzf8d[jsname="V67aGc"]').click()
    await $('h2.honxjf').click()
    await $('input[jsname="YPqjbf"]').click()
    await browser.keys(['Backspace', '4'])
    // // await browser.scroll(0, 700)
    await setMachineType('n1-standard-8')
    await clickGPUSwitch()

    // await browser.debug()
    // const addGPUsSwitch = $('button[aria-label="Add GPUs"]')
    // await addGPUsSwitch.scrollIntoView({ block: 'center' })
    // await addGPUsSwitch.click()

    // await browser.scroll(0, 1700)
    // await $('span[jscontroller="QjUiqc"][jsname="B9mpmd"]').click()
    // await $('span[aria-hidden="true"][role="listbox"][id="c9391"][style="display: none;"]').click()

    // await $('.glue-cookie-notification-bar__accept').click()

    // await browser.pause(5000)
  })
})
