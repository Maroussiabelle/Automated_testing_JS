import { $, browser } from '@wdio/globals'

export async function openWebpage (url) {
  await browser.url(url)
}

export async function tryCloseCookiesPopUp () {
  try {
    await $('button[mode="primary"]').click()
  } catch (ignored) {}
}

export async function tryCloseGoogleAd () {
  try {
    await $('vli.vliIgnore').click()
  } catch (ignored) {}
}

export async function pasteTextToForm (text) {
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

export async function selectExpiration (expiration) {
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

export async function pasteTitle (title) {
  try {
    await clickTitleInputAndSet(title)
  } catch (e) {
    await tryCloseGoogleAd()
    await clickTitleInputAndSet(title)
  }
}

async function clickTitleInputAndSet (title) {
  await $('input#postform-name').setValue(title)
}

export async function clickNewPaste () {
  await $('button[type="submit"]').click()
}
