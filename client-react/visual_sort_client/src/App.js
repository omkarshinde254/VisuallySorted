import './App.css';
import NavBarComponent from './components/navbar'
import BarChartComponent from './components/barChart'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setArray } from './actions';


function App() {
  const arrSize = useSelector(state => state.setArraySize)
  const dispath = useDispatch()
  useEffect(() => {
    const getData = async () => {
      const data = await fetch(`http://127.0.0.1:3001/getArray?size=${arrSize}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // console.log("data: ", data)
      const response = await data.json()
      dispath(setArray(response.arr))
      console.log(response)
    }

    const timeoutId = setTimeout(getData, 500)
    return () => clearTimeout(timeoutId)
  }, [arrSize])


  return (
    <div className='bg-[#DAFFFB]'>
      <NavBarComponent />
      <BarChartComponent />
    </div>
  );
}

export default App;
