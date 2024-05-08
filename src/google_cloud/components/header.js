import { $ } from '@wdio/globals'

export default class GoogleCloudHeader {
  get rootEl () {
    return $('header')
  }

  get icon () {
    return this.rootEl.$('input.mb2a7b')
  }

  get inputBox () {
    return this.rootEl.$('input[name="q"]')
  }
}
