import { Navbar } from 'flowbite-react';
import { TextInput } from 'flowbite-react';
import { Dropdown } from 'flowbite-react';
import { useDispatch } from 'react-redux'
import { setArraySize } from '../actions';


const DropdownComponent = function Component() {
    return (
        <Dropdown label="Dropdown" inline>
            <Dropdown.Item>Insertion Sort</Dropdown.Item>
            <Dropdown.Item>Merge Sort</Dropdown.Item>
        </Dropdown>
    );
}
const NavBarComponent = function Component() {
    // const [arrSize, setArrSize] = useState(0)
    const dispath = useDispatch()

    const handleChange = (e) => {
        // setArrSize(e.target.value)
        dispath(setArraySize(e.target.value))
    }
    return (
        <Navbar fluid rounded className="bg-[#04364A]" >
            <Navbar.Brand className="text-[#DAFFFB]">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Visual Sort</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link className='text-[#64CCC5]'>
                    <span style={{ marginRight: '10px', paddingBottom: 4 }}>Array Size: </span>
                    <div style={{ display: 'inline-block', width: '3vw' }}>
                        <TextInput id="small" type="number" min={2} defaultValue={100} max={300} style={{ padding: 2 }} onChange={handleChange} />
                    </div>
                </Navbar.Link>
                <Navbar.Link className='text-[#64CCC5]'>
                    <DropdownComponent />
                </Navbar.Link>
                <Navbar.Link className='text-[#64CCC5] mr-4'>
                    Run
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar >
    );
}

export default NavBarComponent;