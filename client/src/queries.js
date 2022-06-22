import { gql } from '@apollo/client'

export const GET_PEOPLE = gql`
    {
        people{
            id
            firstName
            lastName
        }
    }
`

export const ADD_PERSON = gql`
    mutation Mutation($id: String! ,$firstName: String!, $lastName: String!) {
        addPerson(id: $id ,firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
    }
}
`

export const UPDATE_PERSON = gql`
    mutation Mutation($id: String!, $firstName: String, $lastName: String) {
        updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
    }
}
`

export const DELETE_PERSON = gql`
    mutation Mutation($id: String!) {
        deletePerson(id: $id) {
            id
            firstName
            lastName
    }
}
`