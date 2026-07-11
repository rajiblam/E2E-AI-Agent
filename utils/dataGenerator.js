const { faker } = require('@faker-js/faker');

const DataGenerator = {
  randomEmail:    () => faker.internet.email(),
  randomUsername: () => faker.internet.userName(),
  randomKeyword:  () => faker.word.noun(),
  randomDate:     () => faker.date.recent().toISOString().split('T')[0],
  randomPassword: () => faker.internet.password({ length: 12, memorable: false }),
};

module.exports = { DataGenerator };
