import { v4 } from "uuid";
import {getUserByEnrollAndPass, generateSession } from "../../models/usersModel/userModel.js";
import moment from "moment";



export async function login(req,res){
    try {
        const enroll = req.body.enroll;
        const pass = req.body.pass;
        const data = await getUserByEnrollAndPass(enroll, pass);
       
        if (data[0]) {
            const uuid = v4()
            const expires = moment().add(1,"days").valueOf();
            let session =uuid
            const results = await generateSession(data[0].id,session,expires)
            console.log(results)
            return res.json({ msg: "Login successful ", error: "", token: uuid ,expires:expires})
        }

        return res.json({ data: [], msg: "No User Found ", error: "" }).status(200)

    } catch (error) {
        console.log(error)
        return res.json({ error: "Internal Server Error", err: error }).status(500)
    }
}