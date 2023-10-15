import express from "express";
import cors from "cors";
import usersRoute from "./routers/usersRoute/config.js"
import slotRoutes from "./routers/slotRoutes/config.js"
const app = express()


app.use(cors())
app.use(express.json())


app.use("/api/users",usersRoute)
app.use("/api/slots",slotRoutes)

app.listen(5000,()=>{
    console.log("Listening PORT 5000 ")
})
