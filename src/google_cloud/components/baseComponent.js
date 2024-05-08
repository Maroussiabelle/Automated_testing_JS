import { $ } from '@wdio/globals'

export default class BaseComponent {
  constructor (rootSelector) {
    this.rootSelector = rootSelector
  }

  get rootEl () {
    return $(this.rootSelector)
  }
}
