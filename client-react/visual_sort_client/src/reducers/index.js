import setArraySize from "./setArraySize";
import setArray from "./setArray";
import { combineReducers } from "redux";


const allReducer = combineReducers({
    setArraySize: setArraySize,
    setArray: setArray,
})

export default allReducer