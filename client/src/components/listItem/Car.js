import React, { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import RemoveCar from '../buttons/RemoveCar'
import UpdateCar from '../forms/UpdateCar'

const getStyles = () => ({
    card: {
        width: '500px',
        marginTop: '15px',
    }
})

const Car = props => {
    // const { carId, id, year, make, model, price, personId, } = props
    const [year, setYear] = useState(props.year)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [price, setPrice] = useState(props.price)
    const [personId, setPersonId] = useState(props.personId)
    const [carId, setCarId] = useState(props.carId)
    const [id] = useState(props.id)
    const [isEditing, setIsEditing] = useState(false)
    const styles = getStyles()

    const handleButtonClick = () => {
        setIsEditing(!isEditing)
    }

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case 'year':
                setYear(value)
                break
            case 'make':
                setMake(value)
                break
            case 'model':
                setModel(value)
                break
            case 'price':
                setPrice(value)
                break
            case 'personId':
                setPersonId(value)
                break
            default:
                break
        }
    }

    return (
        <div>
            {
                isEditing ? (
                    <UpdateCar
                        id={props.carId}
                        year={props.year}
                        make={props.make}
                        model={props.model}
                        price={props.price}
                        personId={props.personId}
                        onButtonClick={handleButtonClick}
                        updateStateVariable={updateStateVariable} />
                ) : (
                    <div>
                        {id == personId ? (
                            <Card
                                type="inner"
                                actions={[
                                    <EditOutlined key="edit" onClick={handleButtonClick} />,
                                    <RemoveCar id={carId} />
                                ]}
                                title={model}
                                style={styles.card}
                            >
                                Year: {year}<br />
                                Make: {make}<br />
                                Price: ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </Card>
                        ) : (
                            null
                        )}
                    </div>
                )
            }

        </div>

    )
}

export default Car