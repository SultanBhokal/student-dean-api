export const paramChecker = (param) => {
    return (req, res, next) => {
        try {

            let flag = true
            let i = 0;
            while (i < param?.length) {

                if (!req.body[param[i]]) {
                    flag = false
                    break
                }
                i += 1
            }
            if (flag) {
                next();
            }
            else {
                return res.json({ msg: "Please provide proper details", error: "" }).status(400)
            }

        } catch (error) {
            return res.json({ msg: "", error: error }).status(500)

        }
    }
}