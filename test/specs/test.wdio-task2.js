import { $, browser } from '@wdio/globals'
import { expect } from 'chai'

async function openWebpage (url) {
  await browser.url(url)
}

async function closeCookiesPopUp () {
  await browser.pause(2000)
  await $('button[mode="primary"]').click()
}

// async function login (login, password) {
//   await $('a.btn-sign.sign-in').click()
//   await $('#loginform-username').setValue(login)
//   await $('#loginform-password').setValue(password)
//   await $('form[action="/login"] button[type="submit"]').click()
// }

async function clickPaste () {
  await $('//span[text()="paste"]').click()
}

async function pasteTextToForm (text) {
  await $('textarea#postform-text').setValue(text)
}

async function selectLanguage (language) {
  await browser.scroll(0, 200)
  await $('span#select2-postform-format-container').click()
  await $(`//li[text()='${language}']`).click()
}

async function setExpiration (period) {
  await $('span#select2-postform-expiration-container').click()
  await $(`//li[text()='${period}']`).click()
}

async function pasteTitle (title) {
  await $('input#postform-name').setValue(title)
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

describe('WebDriver task 2 suite', () => {
  it('Should open a webpage, paste text and select from dropdowns, verify input', async () => {
    await openWebpage('https://pastebin.com/')
    await closeCookiesPopUp()
    // await login(process.env.PASTEBIN_USERNAME, process.env.PASTEBIN_PASSWORD)
    await clickPaste()
    const code = `
git config --global user.name  "New Sheriff in Town"
git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
git push origin master --force
    `.trim()
    await pasteTextToForm(code)
    await selectLanguage('Bash')
    await setExpiration('10 Minutes')
    await pasteTitle('how to gain dominance among developers')
    await clickCreateNewPasteButton()
    // await closeCookiesPopUp()
    await assertPageTitle()
    const bashButtonText = await $('.top-buttons .left a.btn').getHTML(false)
    expect(bashButtonText).to.equal('Bash')

    await $('//div[@class="top-buttons"]//a[text()="raw"]').click()

    const codeText = await $('pre').getText()
    expect(codeText).to.equal(code)
  })

//   it('Should verify that title and selected options are as required', async () => {
//     await browser.url('https://pastebin.com/qnhzZMMJ')
//
//     const pageTitle = await browser.getTitle()
//     expect(pageTitle).to.equal('how to gain dominance among developers - Pastebin.com')
//
//     const bashButton = await $('div.top-buttons a.btn.-small.h_800')
//     const buttonText = await bashButton.getHTML(false)
//     expect(buttonText).to.equal('Bash')
//
//     const rawButton = await $('div.top-buttons .right a.btn.-small')
//     const rawButtonText = await rawButton.getHTML(false)
//     expect(rawButtonText).to.equal('raw')
//     await rawButton.click()
//     const rawCode = await $('pre')
//     const codeText = await rawCode.getText()
//     const expectedCode = `git config --global user.name  "New Sheriff in Town"
// git reset $(git commit-tree HEAD^{tree} -m "Legacy code")
// git push origin master --force`
//     expect(codeText.trim()).to.equal(expectedCode.trim())
//   })
})
