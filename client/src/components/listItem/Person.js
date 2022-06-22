import React, { useState } from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'

const getStyles = () => ({
    card: {
        width: '500px'
    }
})

const Person = (props) => {
    const styles = getStyles()
    const [id] = useState(props.id)
    const [firstName] = useState(props.firstName)
    const [lastName] = useState(props.lastName)
    const [isEditing, setIsEditing] = useState(false)

    const handleButtonClick = () => {
        setIsEditing(true)
    }

    return (
        <Card
            actions={[
                <EditOutlined key='edit' onClick={handleButtonClick} />
            ]}
            style={styles.card}
        >{firstName} {lastName}
        </Card>
    )
}

export default Person