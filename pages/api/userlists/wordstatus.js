import UserList from '../../../models/UserList'
import connectDb  from '../../../utils/connectDb'

connectDb()

export default async function (req, res) {
    if(req.method === 'PATCH') {
        try{
            const {userListId, wordId, updates } = req.body
            const userList = await UserList.findOneAndUpdate({_id: userListId, wordsList: {$elemMatch: {_id: wordId}}},
            {
                $set: {
                    'wordsList.$.dueTime':  updates.dueTime,
                    'wordsList.$.phase':  updates.phase,
                }
            }, {new: true});
            res.json({userList})
        } catch(e) {
            res.status(400).json({error: e})
        }
    }
}