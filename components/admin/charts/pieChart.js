import React, {useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

function PieChart(props) {

    ChartJS.register(ArcElement, Tooltip, Legend);
    const [ food, setFood ] = useState([]);

    useEffect( () => {
        const getFoods = async () => {
            const res =  await fetch("http://localhost:3000/api/food/getFoods");
            const { food } = await res.json();
            setFood(food);
        };
        getFoods();
    }, []);

    const starter = food.filter( food => food.category === "Starter");
    const main = food.filter( food => food.category === "Main Course");
    const dessert = food.filter( food => food.category === "Dessert");

    const data = {
        labels: ['Starter', 'Main Course', 'Dessert'],
        datasets: [
            {
                label: '# of Votes',
                data: [starter.length, main.length, dessert.length],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <div>
            <Pie  data={data}/>
        </div>
    );
}

export default PieChart;