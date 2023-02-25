import List from 'models/List'
import User from 'models/User'
import UserList from 'models/UserList'
import connectDb from 'utils/connectDb'
import { populate_list } from 'utils/server utils/db_utils'

connectDb()

export default async function (req, res) {
   switch (req.method) {
      case 'POST':
         subscribeUser(res, req.body)
         break
   }
}

async function subscribeUser(res, { userId, listId, custom }) {
   try {
      const list = await List.findOne({ _id: listId })
      if (!list) return res.status(400).json({ err: 'List not found.' })
      const wordsIds = list.words.map((wordObjId) => ({
         _id: wordObjId.toString(),
      }))
      const userList = new UserList({
         name: list.name,
         wordsList: [...wordsIds],
         originalList: listId,
         custom
      })
      const user = await User.findByIdAndUpdate(
         userId,
         {
            $push: {
               lists: userList._id,
            },
         },
         { new: true }
      )
      if (!user) return res.status(404).json({ err: 'User not found.' })
      await userList.save()
      const populated_lists = await populate_list(user.lists, UserList)
      return res.status(201).json({ user: user, subscribed_lists: populated_lists })
   } catch (e) {
      res.status(400).json(e)
      console.log(e)
   }
}
