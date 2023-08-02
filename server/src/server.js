

const app = require("./app")
const { ServerPort } = require("./secret")


app.listen(ServerPort, ()=>{
    console.log(`server is running at http://localhost:${ServerPort}`)
})