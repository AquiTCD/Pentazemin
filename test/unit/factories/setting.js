import { Factory } from 'rosie'
import faker from 'faker'
export default new Factory().attrs({
  pomodoroMin: faker.random.number({ min: 25, max: 60 }),
  extendMin: faker.random.number({ min: 3, max: 9 }),
  useWarning: faker.random.boolean(),
  warningMin: faker.random.number({ min: 3, max: 9 }),
  shortBreakName: faker.random.word(),
  shortBreakMin: faker.random.number({ min: 5, max: 15 }),
  useLongBreak: faker.random.boolean(),
  longBreakPoint: faker.random.number({ min: 1, max: 9 }),
  longBreakName: faker.random.word(),
  longBreakMin: faker.random.number({ min: 15, max: 30 }),
  menubarTitle: faker.random.word(),
  maxPomodoros: faker.random.number({ min: 4, max: 8 }),
  defaultPomodoros: faker.random.number({ min: 1, max: 4 }),
  defaultQuadrant: faker.random.number(4),
})
