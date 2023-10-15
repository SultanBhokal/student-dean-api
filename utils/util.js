import moment from "moment";

export function getSlotsArray(timeStamps) {
    const today = moment();
    const endOfYear = moment().endOf('year');
    const slots = [];
    const currentTimeStamp = moment().valueOf()

    while (today.isBefore(endOfYear)) {
        if (today.day() === 4 || today.day() === 5) {
            const timeStamp = today.set({ hour: 10, minute: 0, second: 0, millisecond: 0 }).valueOf()
            const slotTime = today.set({ hour: 10, minute: 0, second: 0, millisecond: 0 }).format('D MMM YY ddd HH:mm A');
            const sessionEnd = today.set({ hour: 11, minute: 0, second: 0, millisecond: 0 }).format('D MMM YY ddd HH:mm A');
            if (timeStamp > currentTimeStamp && !timeStamps?.includes(timeStamp)) {

                slots.push({id: timeStamp , slot: slotTime ,sessionEnds:sessionEnd});

            }
        }
        today.add(1, 'days');
    }
    return slots;
}