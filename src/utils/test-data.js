import { faker } from '@faker-js/faker';

export const generateTestData = () => {
    return {
        question: faker.lorem.sentence(),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phoneNumber: `+31 ${faker.string.numeric('6########')}`, // Ensures a valid Dutch number
        postalCode: faker.location.zipCode({ format: "#### ??" }), // Dutch postal code format
        houseNumber: faker.number.int({ min: 1, max: 500 }), // Random house number
        dutchCity: faker.helpers.arrayElement([
            "Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven",
            "Tilburg", "Groningen", "Almere", "Breda", "Nijmegen",
            "Enschede", "Haarlem", "Arnhem", "Zaanstad", "Amersfoort", "Apeldoorn"
        ]),
    };
};