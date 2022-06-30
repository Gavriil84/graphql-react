import { EditOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { Card, List } from 'antd';
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GET_CARS, GET_PEOPLE } from '../../queries';
import RemovePerson from '../buttons/RemovePerson';
import Car from '../listItem/Car';
import '../../App.css';
import UpdatePerson from '../forms/UpdatePerson';

const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center'
    }
})

const Individual = () => {
    const { pId, firstname, lastname } = useParams();
    const styles = getStyles()
    const people = useQuery(GET_PEOPLE)
    const [showFname, setShowFname] = useState(firstname)
    const [showLname, setShowLname] = useState(lastname)
    const [firstName, setFirstName] = useState(showFname)
    const [lastName, setLastName] = useState(showLname)
    const [isEditing, setIsEditing] = useState(false)

    const { loading, error, data } = useQuery(GET_CARS)

    useEffect(() => {
        if (people.data) {
            const person = people.data.people.find(person => person.id === pId)
            setShowFname(person.firstName)
            setShowLname(person.lastName)
        }
    }, [showFname, showLname])

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
        <div className='App'>
            <Link style={{ fontSize: '30px' }} to='/'>Back</Link>
            <div>{console.log(firstName, lastName)}</div>
            <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
                <List.Item>
                    {
                        isEditing ? (
                            <UpdatePerson
                                id={pId}
                                firstName={firstName}
                                lastName={lastName}
                                onButtonClick={handleButtonClick}
                                updateStateVariable={updateStateVariable}
                            />

                        ) : (
                            <Card
                                actions={[
                                    <EditOutlined key='edit' onClick={handleButtonClick} />,
                                    <RemovePerson id={pId} />
                                ]}
                                style={styles.card}
                            >
                                {firstName} {lastName}
                                {data.cars.map(({ id, year, make, model, price, personId }) => (
                                    <Car type="inner" title={model} key={id} carId={id} id={pId} year={year} make={make} model={model} price={price} personId={personId} />
                                ))}
                            </Card>
                        )
                    }
                </List.Item>
            </List>
        </div>
    )
}

export default Individual