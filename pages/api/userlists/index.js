import UserList from '../../../models/UserList'
import connectDb  from '../../../utils/connectDb'

connectDb()

export default async function (req, res) {
    if(req.method === 'GET') {
        try{
            const userLists = await UserList.find({});
            res.json({userLists})
        } catch(e) {
            res.status(400).json({error: e})
        }
    }
}