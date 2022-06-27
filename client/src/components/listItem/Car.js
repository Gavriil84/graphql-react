import React, { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import RemoveCar from '../buttons/RemoveCar'

const getStyles = () => ({
    card: {
        width: '500px',
        marginTop: '15px',
    }
})

const Car = props => {
    const { carId, id, year, make, model, price, personId, } = props
    const [isEditing, setIsEditing] = useState(false)
    const styles = getStyles()

    const handleButtonClick = () => {
        setIsEditing(!isEditing)
    }

    return (
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

export default Car