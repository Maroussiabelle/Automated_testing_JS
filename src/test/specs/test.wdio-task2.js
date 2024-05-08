import { $, browser } from '@wdio/globals'
import { expect } from 'chai'
import {
  openWebpage,
  pasteTextToForm,
  pasteTitle, selectExpiration,
  tryCloseCookiesPopUp,
  tryCloseGoogleAd
} from '../utils/pasteBinUtils.js'

// login and password for launching in Firefox (learned how to create login and password and store them in .env file)
// async function login (login, password) {
//   await $('a.btn-sign.sign-in').click()
//   await $('#loginform-username').setValue(login)
//   await $('#loginform-password').setValue(password)
//   await $('form[action="/login"] button[type="submit"]').click()
// }

async function selectLanguage (language) {
  try {
    await clickLanguageDropdownAndSelect(language)
  } catch (e) {
    await tryCloseGoogleAd()
    await clickLanguageDropdownAndSelect(language)
  }
}

async function clickLanguageDropdownAndSelect (language) {
  await $('span#select2-postform-format-container').click()
  await $(`//li[text()='${language}']`).click()
}

async function assertPageTitle () {
  const pageTitle = await browser.getTitle()
  expect(['how to gain dominance among developers - Pastebin.com', 'Pastebin.com - #1 paste tool since 2002!'])
    .to.include(pageTitle)
}

async function clickCreateNewPasteButton () {
  await browser.scroll(0, 500)
  await $('//button[@type="submit" and text()="Create New Paste"]').click()
}

async function clickRawButton () {
  await $('//div[@class="top-buttons"]//a[text()="raw"]').click()
}

describe('WebDriver task 2 suite', () => {
  it('Should open a webpage, paste text and select from dropdowns, verify input', async () => {
    await openWebpage('https://pastebin.com/')
    await tryCloseCookiesPopUp()
    await tryCloseGoogleAd()
    const code = `
git config --global user.name  "New Sheriff in Town"
git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
git push origin master --force
    `.trim()
    await pasteTextToForm(code)
    await selectLanguage('Bash')
    await selectExpiration('10 Minutes')
    await pasteTitle('how to gain dominance among developers')
    await clickCreateNewPasteButton()
    await assertPageTitle()
    const bashButtonText = await $('.top-buttons .left a.btn').getHTML(false)
    await clickRawButton()
    const codeText = await $('pre').getText()

    expect(bashButtonText).to.equal('Bash')
    expect(codeText).to.equal(code)
  })
})
