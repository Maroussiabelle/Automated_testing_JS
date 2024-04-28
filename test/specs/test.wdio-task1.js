import { $, browser } from '@wdio/globals'

describe('WebDriver suite', () => {
  it('Task 1 test', async () => {
    await browser.url(
      'https://pastebin.com/'
    )
    await browser.pause(2000)

    const agreeButton = await $('button[mode="primary"]')
    await agreeButton.click()
    const textArea = await $('textarea#postform-text')
    await textArea.setValue('Hello from WebDriver')
    const pasteExpirationSelectSpan = await $('span#select2-postform-expiration-container')
    await pasteExpirationSelectSpan.click()
    const option10M = await $("//li[text()='10 Minutes']")
    await option10M.click()
    const pasteNameTitle = await $('input#postform-name')
    await pasteNameTitle.setValue('helloweb')
    const createNewPasteButton = await $('button[type="submit"]')
    await createNewPasteButton.click()
  })
})
