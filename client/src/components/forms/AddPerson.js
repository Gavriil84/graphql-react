import React, { useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd'
import { useMutation } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import { ADD_PERSON, GET_PEOPLE } from '../../queries'

const AddPerson = () => {
    const [id, setId] = useState(uuidv4())
    const [addPerson] = useMutation(ADD_PERSON)
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    const onFinish = values => {
        const { firstName, lastName } = values

        addPerson({
            variables: {
                id,
                firstName,
                lastName
            },
            update: (proxy, { data: { addPerson } }) => {
                const data = proxy.readQuery({ query: GET_PEOPLE })
                proxy.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                        ...data,
                        people: [...data.people, addPerson]
                    }
                })
            }
        })

        setId(uuidv4())
    }

    useEffect(() => {
        forceUpdate({})
    }, [])

    return (
        <Form
            form={form}
            name='add-contact-form'
            layout='inline'
            size='large'
            style={{ margin: '40px' }}
            onFinish={onFinish}>
            <Form.Item name="firstName" rules={[{ required: true, message: 'Please enter first name' }]}>
                <Input placeholder="i.e. John" />
            </Form.Item>
            <Form.Item name="lastName" rules={[{ required: true, message: 'Please enter last name' }]}>
                <Input placeholder="i.e. Doe" />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length}
                    >Add Contact</Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default AddPerson