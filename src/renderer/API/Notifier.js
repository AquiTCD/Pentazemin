export default {
  complete(content) {
    /* eslint-disable no-new */
    let notify = new Notification('FINISH', {
      body: `${content.name} is done!`,
      silent: true,
    })
    setTimeout(notify.close.bind(notify), 5000)
  },
  worning(content) {
    /* eslint-disable no-new */
    const WARNING_TIME = 3
    let notify = new Notification('WARNING', {
      body: `${content.name} will be finished in ${WARNING_TIME} minutes`,
      silent: true,
    })
    setTimeout(notify.close.bind(notify), 5000)
  },
}
