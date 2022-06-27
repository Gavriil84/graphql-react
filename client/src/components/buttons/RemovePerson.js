import { useMutation } from '@apollo/client'
import { filter } from 'lodash'

import { DeleteOutlined } from '@ant-design/icons'
import { DELETE_PERSON, GET_PEOPLE } from '../../queries'

const RemovePerson = props => {
    const { id } = props
    const [removePerson] = useMutation(DELETE_PERSON, {
        update(cache, { data: { deletePerson } }) {
            const { people } = cache.readQuery({ query: GET_PEOPLE })
            cache.writeQuery({
                query: GET_PEOPLE,
                data: filter(people, person => person.id !== deletePerson.id)
            })
        }
    })

    const handleButtonClick = () => {
        let result = window.confirm('Are you sure you want to delete this person?')

        if (result) {
            removePerson({
                variables: {
                    id
                }
            })
        }
    }

    return (
        <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }} />
    )
}

export default RemovePerson