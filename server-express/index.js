const express = require("express")
const cors = require("cors")
const app = express()
const port = 3001

// CORS middleware
app.use(cors())

// JSON middleware
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Server Started!")
})

app.get("/getArray", (req, res) => {
    let arrSize = req.query.size
    // console.log("Arrat Size: ", arrSize)
    let arr = []
    minElem = 1
    maxElem = 100
    for (let i = 0; i < arrSize; i++) {
        arr.push(Math.floor(Math.random() * (maxElem - minElem + 1)) + minElem)
    }
    res.send({
        "result": "ok",
        "arr": arr
    })
})

app.listen(port, () => {
    console.log("Listing on port", port)
})