import User from '../../../models/User'
import connectDb  from '../../../utils/connectDb'

connectDb()

export default async function (req, res) {
    if(req.method === 'POST') {
        try{
            const newUser = await User.create(req.body);
            res.status(201).json({res: newUser})
        } catch (e) {
            res.status(400).json({e})
            console.log(e);
        }
    } else if(req.method === 'GET') {
        try{
            const users = await User.find({});
            res.json({users})
        } catch(e) {
            res.status(400).json({error: e})
        }
    } else if (req.method === "DELETE") {
        const deletedUser = await User.findByIdAndDelete(req.body._id)
        if(deletedUser) return res.status(203).json({deleted: deletedUser})
        res.status(404).json({err: 'User Not Found.'})
    }
}