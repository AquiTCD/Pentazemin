import utils from '../utils'

describe('Launch', function() {
  beforeEach(utils.beforeEach)
  afterEach(utils.afterEach)

  it('shows the proper application title', function() {
    return this.app.client
      .windowByIndex(1)
      .getTitle()
      .then(title => {
        assert(title === 'Pentazemin')
      })
  })
  it('shows initial windows, mb and fs', function() {
    return this.app.client.getWindowCount().then(function(count) {
      assert(count === 2)
    })
  })
  it('shows main menubar app and fullscreen notifier')
  it('has the poper title in fullscreen notifer', function() {
    return this.app.browserWindow.getTitle().then(title => {
      assert(title === 'Pentazemin-notifier')
    })
  })
})
