

const { connect } = require("mongoose");
const app = require("./app")
const { ServerPort } = require("./secret");
const connectDatabase = require("./config/db");


app.listen(ServerPort, async()=>{
    console.log(`server is running at http://localhost:${ServerPort}`);
    await connectDatabase();
})