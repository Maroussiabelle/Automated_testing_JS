import { $, browser } from '@wdio/globals'

describe('WebDriver Task 1 suite', () => {
  it('Should open webpage and create new paste with given attributes', async () => {
    await browser.url(
      'https://pastebin.com/'
    )
    // wait for "We value your privacy" window to appear and press "agree" button
    await browser.pause(2000)
    const agreeButton = await $('button[mode="primary"]')
    await agreeButton.click()
    // Write code: "Hello from WebDriver"
    const textArea = await $('textarea#postform-text')
    await textArea.setValue('Hello from WebDriver')
    // Paste Expiration: "10 Minutes"
    const pasteExpirationSelectSpan = await $('span#select2-postform-expiration-container')
    await pasteExpirationSelectSpan.click()
    const option10M = await $("//li[text()='10 Minutes']")
    await option10M.click()
    // Paste Name / Title: "helloweb"
    const pasteNameTitle = await $('input#postform-name')
    await pasteNameTitle.setValue('helloweb')
    const createNewPasteButton = await $('button[type="submit"]')
    await createNewPasteButton.click()
  })
})
