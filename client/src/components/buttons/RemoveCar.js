import { useMutation } from '@apollo/client'
import { filter } from 'lodash'

import { DeleteOutlined } from '@ant-design/icons'
import { DELETE_CAR, GET_CARS } from '../../queries'

const RemoveCar = props => {
    const { id } = props
    const [removeCar] = useMutation(DELETE_CAR, {
        update(cache, { data: { deleteCar } }) {
            const { cars } = cache.readQuery({ query: GET_CARS })
            cache.writeQuery({
                query: GET_CARS,
                data: {
                    cars: filter(cars, car => car.id !== deleteCar.id)
                }
            })
        }
    })

    const handleButtonClick = () => {
        let result = window.confirm('Are you sure you want to remove this contact?')

        if (result) {
            removeCar({
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

export default RemoveCar