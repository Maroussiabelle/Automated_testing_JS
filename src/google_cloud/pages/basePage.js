import { browser } from '@wdio/globals'

export default class BasePage {
  constructor (url) {
    this.url = url
  }

  async open () {
    await browser.url(this.url)
  }
}
