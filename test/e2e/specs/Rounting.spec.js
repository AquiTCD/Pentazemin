import utils from '../utils'

describe('Routing', function() {
  beforeEach(utils.beforeEach)
  afterEach(utils.afterEach)

  it('shows Info view when click App icon', function() {
    let w = this.app.client.windowByIndex(1)
    return w
      .click('.root')
      .then(() => w.getText('.appName'))
      .then(text => {
        assert(text === 'Pentazemin')
      })
  })
  it('shows Plan view when click Plan in nav', function() {
    let w = this.app.client.windowByIndex(1)
    return w
      .click('.plan')
      .then(() => w.$('tr').getText('th:nth-of-type(1)'))
      .then(text => {
        assert(text === '#')
      })
  })
  it('shows Aim view when click Aim in nav', function() {
    let w = this.app.client.windowByIndex(1)
    return w
      .click('.aim')
      .then(() => w.$('.sub-indicator').getText('p:nth-of-type(1)'))
      .then(text => {
        assert(text === 'Remaining')
      })
  })
  it('shows Analyze view when click Analyze in nav', function() {
    let w = this.app.client.windowByIndex(1)
    return w
      .click('.analyze')
      .then(() => w.$('tr').getText('th:nth-of-type(1)'))
      .then(text => {
        assert(text === 'Archives Name')
      })
  })
})
