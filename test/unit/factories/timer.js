import { Factory } from 'rosie'
import faker from 'faker'
export default new Factory().attrs({
  name: '',
  isCounting: false,
  isInBreak: false,
  remainingSec: faker.random.number({ min: 1, max: 300 }),
  breakCount: faker.random.number(3),
})
