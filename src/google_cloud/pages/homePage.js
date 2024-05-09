import { browser } from '@wdio/globals'
import GoogleCloudHeader from '../components/header.js'
import BasePage from './basePage.js'

class GoogleCloudHomePage extends BasePage {
  constructor () {
    super('https://cloud.google.com/')
    this.header = new GoogleCloudHeader()
  }

  async setCookiesLocalStorageItem () {
    await browser.execute(() =>
      localStorage.setItem(
        'glue.CookieNotificationBar',
            `[{"category":"2A","date":"${new Date().toISOString()}","eea":true,"siteId":"cloud.google.com","status":"ACCEPTED"}]`
      )
    )
  }
}

export default GoogleCloudHomePage
