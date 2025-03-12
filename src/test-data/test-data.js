import {faker} from '@faker-js/faker';

export const generateTestData = () => {
    return {
        question: faker.lorem.sentence(),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phoneNumber: `+31 ${faker.string.numeric('6########')}`,
    };
};