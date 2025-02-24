import { faker } from '@faker-js/faker';

export const generateTestData = () => {
    return {question: faker.lorem.sentence(),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phoneNumber: faker.phone.number('+31 6 #### ####')
    };
};