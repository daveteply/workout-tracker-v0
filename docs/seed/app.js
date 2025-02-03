import { faker } from '@faker-js/faker';

// Function to generate fake data
function generateFakeData() {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      name: faker.person.firstName(),
    });
  }
  return data;
}

// Generate and print fake data
const fakeData = generateFakeData();
console.log(JSON.stringify(fakeData, null, 2));
