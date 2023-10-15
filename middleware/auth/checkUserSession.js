import moment from "moment";
import { getSessionDetails } from "../../models/usersModel/userModel.js"

export async function checkUserSession(req,res,next){
    try {
        const auth = req.headers["authorization"]?.split(" ")
        const bearer =auth[1]

        if(bearer){
            const sessions = await getSessionDetails(bearer);
            const currDate = moment().valueOf()
            if(sessions[0] && sessions[0].sessionExpiry > currDate){
                req.user = sessions[0]
                next()
            }
            else{
                return res.json({error:"PLease login , Session is expired Or not found"}).status(200)
            }
        }
        else{
            return res.json({error:"Please login to continue"}).status(403)
        }
    } catch (error) {
        return res.json({error})
    }

}
