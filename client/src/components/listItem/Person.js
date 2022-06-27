import React, { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import UpdatePerson from '../forms/UpdatePerson'
import RemovePerson from '../buttons/RemovePerson'

const getStyles = () => ({
    card: {
        width: '500px'
    }
})

const Person = (props) => {
    const styles = getStyles()
    const [id] = useState(props.id)
    const [firstName, setFirstName] = useState(props.firstName)
    const [lastName, setLastName] = useState(props.lastName)
    const [isEditing, setIsEditing] = useState(false)

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
                    >{firstName} {lastName}
                    </Card>
                )
            }
        </div>
    )
}

export default Person