import { browser } from '@wdio/globals'

export class StartPage {
  async open () {
    await browser.url('https://cloud.google.com/')
    await browser.execute(() =>
      localStorage.setItem(
        'glue.CookieNotificationBar',
            `[{"category":"2A","date":"${new Date().toISOString()}","eea":true,"siteId":"cloud.google.com","status":"ACCEPTED"}]`
      )
    )
  }
}

export default StartPage