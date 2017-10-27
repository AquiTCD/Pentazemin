import { Factory } from 'rosie'
const POMODORO_COUNT = 3
export default new Factory()
  .sequence('id')
  .sequence('index')
  .sequence('missionId', i => Math.ceil(i / POMODORO_COUNT))
  .attrs({
    isComplete: false,
  })
