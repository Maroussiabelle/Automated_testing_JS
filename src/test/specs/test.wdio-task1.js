import { $, browser } from '@wdio/globals'

async function openWebpage (url) {
  await browser.url(url)
}

async function tryCloseCookiesPopUp () {
  try {
    await $('button[mode="primary"]').click()
  } catch (ignored) {}
}

async function tryCloseGoogleAd(){
  try {
    await $('vli.vliIgnore').click()
  } catch(ignored) {}
}

async function pasteTextToForm (text) {
  try {
    await clickTextAreaAndPasteText(text)
  } catch (e) {
    await tryCloseGoogleAd()
    await clickTextAreaAndPasteText(text)
  }
}

async function clickTextAreaAndPasteText (text) {
  await $('//span[text()="paste"]').click()
  await $('textarea#postform-text').setValue(text)
}

async function selectExpiration (expiration) {
  try {
    await clickExpirationAndSelect(expiration)
  } catch (e) {
    await tryCloseGoogleAd()
    await clickExpirationAndSelect(expiration)
  }
}

async function clickExpirationAndSelect (expiration) {
  await $('span#select2-postform-expiration-container').click()
  await $(`//li[text()='${expiration}']`).click()
}

async function pasteTitle (title) {
  await $('input#postform-name').setValue(title)
}

async function clickNewPaste () {
  await $('button[type="submit"]').click()
}

describe('WebDriver Task 1 suite', () => {
  it('Should open webpage and create new paste with given attributes', async () => {
    await openWebpage('https://pastebin.com/')
    await tryCloseCookiesPopUp()
    await tryCloseGoogleAd()
    await pasteTextToForm('Hello from WebDriver')
    await browser.execute(() => window.scrollTo({top: 500, behavior: 'smooth'}))
    await selectExpiration('10 Minutes')
    await pasteTitle('helloweb')
    await clickNewPaste()
  })
})
