import { Factory } from 'rosie'
import faker from 'faker'
export default new Factory().sequence('id').attrs({
  date: faker.date.past(),
  notes: faker.lorem.paragraph(),
  isDeleted: false,
  missions: [
    {
      id: faker.random.uuid(),
      count: faker.random.number({ min: 1, max: 4 }),
    },
  ],
})
