import jwt from "jsonwebtoken"


export const verify = (req, res, next) => {
    const header = req.headers.authorization
    if (!header || !header.startsWith("Bearer")) {
        return res.status(403).json("You are not loged in")
    }
    const token = header.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(403).json("invalid token")
        }
        req.user = user
        next()
    })
}

export const adminGuard = (req, res, next) => {
    const header = req.headers.authorization
    if (!header || !header.startsWith("Bearer")) {
        return res.status(403).json("You are not loged in")
    }
    const token = header.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(403).json("invalid token")
        }
        if (!user || user.role !== 'admin') {
            return res.status(403).json("you dont have permissions")
        }
        next()
    })
}