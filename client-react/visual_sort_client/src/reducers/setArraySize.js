const setArraySize = (state = 100, action) => {
    switch (action.type) {
        case "SET_ARRAY_SIZE": {
            if (action.payload === undefined) {
                return state
            }
            if (parseInt(action.payload) < 2) {
                return 2
            }
            else {
                return parseInt(action.payload)
            }
        }
        default: {
            return state
        }
    }
}

export default setArraySize