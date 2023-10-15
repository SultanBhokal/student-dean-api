import { getBookedSlots, getBookedSlotsOnDid, insertSlot } from "../../models/slotsModel/slotModel.js";
import { getSlotsArray } from "../../utils/util.js";
import moment from "moment";
async function getSlotsForStudents(userDetails) {
    try {
        const bookedSlots = await getBookedSlotsOnDid(userDetails?.did);
        if (bookedSlots?.length > 0) {
            const timeStamps = bookedSlots?.map((slot) => {
                return slot.starttime
            })
            return getSlotsArray(timeStamps)
        }
        else {
            return getSlotsArray([])
        }

    } catch (error) {
        console.log(error)
        return error
    }

}
async function getSlotsForDean(userDetails) {
    try {
        const bookedSlots = await getBookedSlotsOnDid(userDetails?.did);
        const today = moment()
        const latestSlots = bookedSlots.filter(slot=>slot.starttime>today.valueOf());

        const results = latestSlots.map(slot => {
            
                const datetime = moment(slot.starttime).format("D MMM YY ddd HH:mm A");

                let obj = {
                    bookedBy: slot.bookedBy,
                    purpose: slot.purpose,
                    slotDateAndTime: datetime
                }
                return obj
            
        })
        return results

    } catch (error) {
        console.log(error)
        return error
    }
}

export async function bookSlot(req, res) {
    try {
        const { id, purpose } = req.body;
        const userDetails = req.user;
        const day = moment.unix(id)
        const sessionEnds = day.set({ hour: 11, minute: 0, second: 0, millisecond: 0 }).valueOf();


        const data = {
            bookedBy: userDetails.name,
            purpose,
            did: userDetails.did,
            starttime: id,
            endtime:sessionEnds,
            uid: userDetails.id,
        }

        const results = await insertSlot(data)
        console.log(results)
        return res.json({ results }).status(200)

    } catch (error) {
        console.log(error)
        return res.json({ error })
    }
}

export async function getSlots(req, res) {
    try {

        if (req.user?.rid === 1) {
            

            const data = req.user

            const slots = await getSlotsForStudents(data)

            return res.json({ slots })
        }
        if (req.user?.rid === 2) {
            const data = req.user
            const slots = await getSlotsForDean(data)
            return res.json({ slots })
        }

        return res.json({ slots: [] })


    } catch (error) {
        console.log(error)
        return res.json({ error: "Internal server error" }).status(500)
    }

}