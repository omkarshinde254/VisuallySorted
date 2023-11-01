import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarChartComponent = () => {
    const arr = useSelector(state => state.setArray)

    const options = {
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                display: false,
                grid: {
                    display: false,
                },
            }
        },
        plugins: {
            legend: {
                display: false
            },
        },
    };

    const [labels, setLabels] = useState([]);
    const data = {
        labels,
        datasets: [{
            data: labels,
            backgroundColor: '#176B87'
        }],
    };

    useEffect(() => {
        setLabels(arr)
    }, [arr])

    return <Bar data={data} options={{ maintainAspectRatio: true, animation: false, ...options }}
        style={{ paddingLeft: '1%', paddingRight: '1%', bottom: '1px', maxHeight: "91vh", marginTop: "2vh" }}
    />;
};

export default BarChartComponent