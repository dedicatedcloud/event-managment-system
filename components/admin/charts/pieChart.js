import React, {useEffect, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Box from "@mui/material/Box";

function PieChart(props) {

    ChartJS.register(ArcElement, Tooltip, Legend);
    const [ food, setFood ] = useState([]);

    useEffect( () => {
        const getFoods = async () => {
            const res =  await fetch("/api/food/getFoods");
            const { food } = await res.json();
            setFood(food);
        };
        getFoods();
    }, []);

    const menu1 = food.filter( food => food.menu === "Menu 1");
    const menu2 = food.filter( food => food.menu === "Menu 2");
    const menu3 = food.filter( food => food.menu === "Menu 3");

    const data = {
        labels: ['Menu 1', 'Menu 2', 'Menu 3'],
        datasets: [
            {
                label: '# of Votes',
                data: [menu1.length, menu2.length, menu3.length],
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
        <Box component={"div"}>
            <Pie  data={data}/>
        </Box>
    );
}

export default PieChart;