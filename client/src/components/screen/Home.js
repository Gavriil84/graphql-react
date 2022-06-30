import React from 'react'
import '../../App.css';
import 'antd/dist/antd.css'
import Title from '../layout/Title';
import AddPerson from '../forms/AddPerson';
import People from '../lists/People';
import AddCar from '../forms/AddCar';

const Home = () => {
    return (
        <div className="App">
            <Title />
            <AddPerson />
            <AddCar />
            <People />
        </div>

    )
}

export default Home