import { gql } from "apollo-server-express";
import { find, remove } from 'lodash';
import { people, cars } from './peopleCarsScheme';

const typeDefs = gql`
    type People {
        id: String!
        firstName: String
        lastName: String
    }

    type Cars {
        id: String!
        year: Int
        make: String
        model: String
        price: Float
        personId: String
    }

    type Query {
        person(id: String!): People
        people: [People]
        car(id: String!): Cars
        cars: [Cars]
    }

    type Mutation {
        addPerson(id: String, firstName: String!, lastName: String!): People
        updatePerson(id: String!, firstName: String, lastName: String): People
        deletePerson(id: String!): People
        addCar(id: String, year: Int!, make: String!, model: String!, price: Float!, personId: String!): Cars
        updateCar(id: String!, year: Int, make: String, model: String, price: Float, personId: String): Cars
        deleteCar(id: String!): Cars
    }
`

const resolvers = {
    Query: {
        people: () => people,
        person(parent, args, context, info) {
            return find(people, { id: args.id })
        },
        cars: () => cars,
        car(parent, args, context, info) {
            return find(cars, { id: args.id })
        }
    },

    Mutation: {
        addPerson(root, args) {
            const newPerson = {
                id: args.id,
                firstName: args.firstName,
                lastName: args.lastName
            }
            people.push(newPerson)

            return newPerson
        },
        updatePerson(root, args) {
            const person = find(people, { id: args.id })
            if (!person) {
                throw new Error('Person not found')
            }

            person.firstName = args.firstName
            person.lastName = args.lastName

            return person;
        },
        deletePerson(root, args) {
            const deletePerson = find(people, { id: args.id })
            if (!deletePerson) {
                throw new Error('Person not found')
            }

            remove(people, { id: args.id })

            return deletePerson;
        },
        addCar(root, args) {
            const newCar = {
                id: args.id,
                year: args.year,
                make: args.make,
                model: args.model,
                price: args.price,
                personId: args.personId
            }
            cars.push(newCar)

            return newCar
        },
        updateCar(root, args) {
            const car = find(cars, { id: args.id })
            if (!car) {
                throw new Error('Car not found')
            }

            car.year = args.year
            car.make = args.make
            car.model = args.model
            car.price = args.price
            car.personId = args.personId

            return car;
        },
        deleteCar(root, args) {
            const deleteCar = find(cars, { id: args.id })
            if (!deleteCar) {
                throw new Error('Car not found')
            }

            remove(cars, { id: args.id })

            return deleteCar
        }

    }
}

export { typeDefs, resolvers };