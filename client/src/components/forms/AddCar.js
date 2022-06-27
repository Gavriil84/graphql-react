import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Form, Input, Button, Select } from 'antd'
import { useQuery } from '@apollo/client'

import { v4 as uuidv4 } from 'uuid'
import { ADD_CAR, GET_CARS, GET_PEOPLE } from '../../queries'
const { Option } = Select;

const AddCar = () => {
    const [id, setId] = useState(uuidv4())
    const [addCar] = useMutation(ADD_CAR)
    const [form] = Form.useForm()
    const [, forceUpdate] = useState()
    const { data } = useQuery(GET_PEOPLE)

    const onFinish = values => {
        let { year, make, model, price, personId } = values
        year = parseInt(year)
        price = parseInt(price)

        addCar({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId
            },
            update: (proxy, { data: { addCar } }) => {
                const data = proxy.readQuery({ query: GET_CARS })
                proxy.writeQuery({
                    query: GET_CARS,
                    data: {
                        cars: [...data.cars, addCar]
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
            name='add-car-form'
            layout='inline'
            size='large'
            style={{ margin: '40px' }}
            onFinish={onFinish}>

            <Form.Item
                name='year' rules={[{ required: true, message: 'Please input year!' }]}>
                <Input placeholder='2022' />
            </Form.Item>

            <Form.Item
                name='make' rules={[{ required: true, message: 'Please input a maker!' }]}>
                <Input placeholder='Toyota' />
            </Form.Item>

            <Form.Item
                name='model' rules={[{ required: true, message: 'Please input a model!' }]}>
                <Input placeholder='Prius' />
            </Form.Item>

            <Form.Item
                name='price' rules={[{ required: true, message: 'Please input a price!' }]}>
                <Input placeholder='45000' />
            </Form.Item>

            {/*<div>{console.log(data ? data.people : null)}</div>*/}

            <Form.Item name='personId' rules={[{ required: true, message: 'Please select a person!' }]}>
                <Select placeholder='Select a person' style={{ width: 200 }}>
                    {data ? data.people.map(person =>
                        <Option key={person.id} value={String(person.id)}>{person.firstName} {person.lastName}</Option>
                    ) : null}
                </Select>
            </Form.Item>

            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length}
                    >Add Car</Button>
                )}
            </Form.Item>


        </Form>

    )
}

export default AddCar