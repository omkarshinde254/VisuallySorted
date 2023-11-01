import './App.css';
import { Navbar } from 'flowbite-react';
import { Dropdown } from 'flowbite-react';
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


const DropdownComponent = function Component() {
  return (
    <Dropdown label="Dropdown" inline>
      <Dropdown.Item>Insertion Sort</Dropdown.Item>
      <Dropdown.Item>Merge Sort</Dropdown.Item>
    </Dropdown>
  );
}

const NavBarComponent = function Component() {
  return (
    <Navbar fluid rounded className="bg-[#04364A]" >
      <Navbar.Brand className="text-[#DAFFFB]">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Visual Sort</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link className='text-[#64CCC5] py-2'>
          Home
        </Navbar.Link>
        <Navbar.Link className='text-[#64CCC5]'>
          <DropdownComponent />
        </Navbar.Link>
        <Navbar.Link className='text-[#64CCC5] mr-4'>
          Run
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const BarChartComponent = () => {
  return <Bar data={data} />;
};


function App() {
  return (
    <div>
      <NavBarComponent />
      Hello World
      <BarChartComponent />
    </div>
  );
}

export default App;
