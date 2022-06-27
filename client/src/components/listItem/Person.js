import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import UpdatePerson from '../forms/UpdatePerson'
import RemovePerson from '../buttons/RemovePerson'
import { GET_CARS } from '../../queries'
import Car from './Car'
const getStyles = () => ({
    card: {
        width: '500px',
        fontSize: '30px'
    }
})

const Person = (props) => {
    const styles = getStyles()
    const [id] = useState(props.id)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const [isEditing, setIsEditing] = useState(false)

    const { loading, error, data } = useQuery(GET_CARS)

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    const handleButtonClick = () => {
        setIsEditing(!isEditing)
    }

    const updateStateVariable = (variables, value) => {
        switch (variables) {
            case 'firstName':
                setFirstName(value)
                break
            case 'lastName':
                setLastName(value)
                break
            default:
                break
        }
    }

    return (
        <div>
            {
                isEditing ? (
                    <UpdatePerson
                        id={props.id}
                        firstName={props.firstName}
                        lastName={props.lastName}
                        onButtonClick={handleButtonClick}
                        updateStateVariable={updateStateVariable}
                    />

                ) : (
                    <Card
                        actions={[
                            <EditOutlined key='edit' onClick={handleButtonClick} />,
                            <RemovePerson id={id} />
                        ]}
                        style={styles.card}
                    >
                        {firstName} {lastName}
                        {data.cars.map(({ id, year, make, model, price, personId }) => (
                            <Car type="inner" title={model} key={id} carId={id} id={props.id} year={year} make={make} model={model} price={price} personId={personId} />
                        ))}
                    </Card>
                )
            }
        </div>
    )
}

export default Person