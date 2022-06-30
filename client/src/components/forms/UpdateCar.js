import { useMutation, useQuery } from '@apollo/client'
import { Button, Form, Input, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { GET_CARS, GET_PEOPLE, UPDATE_CAR } from '../../queries'
import { v4 as uuidv4 } from 'uuid'

const { Option } = Select;

const UpdateCar = props => {
    const [id, setId] = useState(props.id)
    const [year, setYear] = useState(props.year)
    const [make, setMake] = useState(props.make)
    const [model, setModel] = useState(props.model)
    const [price, setPrice] = useState(props.price)
    const [personId, setPersonId] = useState(props.personId)
    const [updateCar] = useMutation(UPDATE_CAR)
    const { data } = useQuery(GET_PEOPLE)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    useEffect(() => {
        forceUpdate({})
    }, [])

    const updateStateVariable = (variable, value) => {
        props.updateStateVariable(variable, value)
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

    const onFinish = values => {
        let { year, make, model, price, personId } = values
        year = parseInt(year)
        price = parseInt(price)

        updateCar({
            variables: {
                id,
                year,
                make,
                model,
                price,
                personId
            },
        })

        props.onButtonClick()
    }

    return (
        <Form
            form={form}
            name='update-car-form'
            layout='inline'
            onFinish={onFinish}
            initialValues={{
                year: year,
                make: make,
                model: model,
                price: price,
                personId: personId
            }}>
            <Form.Item
                name='year' rules={[{ required: true, message: 'Please enter a year' }]}>
                <Input placeholder='2022'
                    onChange={e => updateStateVariable('year', e.target.value)} />
            </Form.Item>
            <Form.Item
                name='make' rules={[{ required: true, message: 'Please enter a maker' }]}>
                <Input placeholder='Toyota'
                    onChange={e => updateStateVariable('make', e.target.value)} />
            </Form.Item>
            <Form.Item
                name='model' rules={[{ required: true, message: 'Please enter a model' }]}>
                <Input placeholder='Prius'
                    onChange={e => updateStateVariable('model', e.target.value)} />
            </Form.Item>
            <Form.Item
                name='price' rules={[{ required: true, message: 'Please enter a price' }]}>
                <Input placeholder='45000'
                    onChange={e => updateStateVariable('price', e.target.value)} />
            </Form.Item>
            <Form.Item
                name='personId' rules={[{ required: true, message: 'Please enter a personId' }]}>
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
                        disabled={
                            (!form.isFieldTouched('year') && !form.isFieldTouched('make')) && !form.isFieldTouched('model') && !form.isFieldTouched('price') && !form.isFieldTouched('personId') ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }>
                        Update Car
                    </Button>
                )}
            </Form.Item>
            <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    )
}

export default UpdateCar