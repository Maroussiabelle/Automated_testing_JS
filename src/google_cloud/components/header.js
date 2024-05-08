import BaseComponent from './baseComponent.js'

export default class GoogleCloudHeader extends BaseComponent {
  constructor () {
    super('header')
  }

  get icon () {
    return this.rootEl.$('input.mb2a7b')
  }

  get inputBox () {
    return this.rootEl.$('input[name="q"]')
  }
}
