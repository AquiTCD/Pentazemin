import moment from 'moment'
import 'moment-duration-format'

export default {
  secToMMSS(sec) {
    return moment.duration(sec, 'seconds').format('mm:ss', { trim: false })
  },
  secToHM(sec) {
    if (sec < 3600) {
      return `${moment.duration(sec, 'seconds').format('m [min]')}`
    } else {
      return `${moment.duration(sec, 'seconds').format('h [hrs]', 2)}`
    }
  },
  secToTimeFromNow(sec) {
    return moment()
      .add(sec, 'seconds')
      .format('kk:mm')
  },
  dateTimeToDate(dateTime) {
    return moment(dateTime).format('YYYY-MM-DD')
  },
}
