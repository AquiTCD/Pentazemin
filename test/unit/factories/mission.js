import { Factory } from 'rosie'
import faker from 'faker'
export default new Factory().sequence('id').attrs({
  name: faker.lorem.words(),
  pomodoros: faker.random.number({ min: 1, max: 4 }),
  quadrant: faker.random.number(4),
  tags: [
    {
      name: '@' + faker.lorem.word(),
      code: '@12345',
    },
    {
      name: '@' + faker.lorem.word(),
      code: '@67890',
    },
  ],
  notes: faker.lorem.paragraph(),
  isDeleted: false,
  remainingSec: faker.random.number({ min: 1, max: 1500 }),
})
