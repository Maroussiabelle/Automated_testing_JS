import { browser } from '@wdio/globals'
import {
  clickNewPaste,
  openWebpage,
  pasteTextToForm, pasteTitle,
  selectExpiration,
  tryCloseCookiesPopUp,
  tryCloseGoogleAd
} from '../utils/pasteBinUtils.js'

describe('WebDriver Task 1 suite', () => {
  it('Should open webpage and create new paste with given attributes', async () => {
    await openWebpage('https://pastebin.com/')
    await tryCloseCookiesPopUp()
    await tryCloseGoogleAd()
    await pasteTextToForm('Hello from WebDriver')
    await browser.execute(() => window.scrollTo({ top: 500, behavior: 'smooth' }))
    await selectExpiration('10 Minutes')
    await pasteTitle('helloweb')
    await clickNewPaste()
  })
})
