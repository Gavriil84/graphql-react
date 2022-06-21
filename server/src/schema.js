import { gql } from "apollo-server-express";
import { find, remove } from 'lodash';
import { people, cars } from './peopleCarsScheme';

const typeDefs = gql`
    type People {
        id: String!
        firstName: String
        lastName: String
    }

    type Query {
        person(id: String!): People
        people: [People]
    }

    type Mutation {
        addPerson(id: String, firstName: String!, lastName: String!): People
        updatePerson(id: String!, firstName: String, lastName: String): People
        deletePerson(id: String!): People
    }
`

const resolvers = {
    Query: {
        people: () => people,
        person(parent, args, context, info) {
            return find(people, { id: args.id })
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
        }

    }
}

export { typeDefs, resolvers };