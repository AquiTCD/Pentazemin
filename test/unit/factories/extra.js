import { Factory } from 'rosie'
import faker from 'faker'
export default new Factory().sequence('id').attrs({
  name: faker.lorem.words(),
  min: faker.random.number({ min: 1, max: 240 }),
  isRepeat: false,
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
  isComplete: false,
  isDeleted: false,
})
