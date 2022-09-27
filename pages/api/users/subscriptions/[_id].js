import User from 'models/User'
import UserList from 'models/UserList'
import connectDb from 'utils/connectDb'
import { populate_list } from 'utils/server utils/db_utils'

connectDb()

export default async function (req, res) {
   switch (req.method) {
      case 'GET':
         await getSubscriptions(res, req.query._id)
         break
      case 'DELETE':
         await unsubscribe(res, req.query._id, req.body)
         break
   }
}

async function getSubscriptions(res, userId) {
   try {
      const user = await User.findById(userId)
      if (!user) return res.status(404).json({ err: 'User not found.' })
      let lists = []
      for (let x = 0; x < user.lists.length; x++) {
         const userList = await UserList.findById(user.lists[x])
         if (userList) lists.push(userList)
      }
      user.lists = lists.map((list) => list._id)
      await user.save()
      res.status(200).json({ lists: lists })
   } catch (e) {
      console.log(e)
      res.status(400).json({ error: e })
   }
}

async function unsubscribe(res, userId, { userListId }) {
   try {
      const updatedUser = await User.findByIdAndUpdate(
         userId,
         {
            $pull: { lists: userListId },
         },
         { new: true }
      )
      const deletedUserList = await UserList.findByIdAndDelete(userListId)
      if (!updatedUser || !deletedUserList)
         return res.status(404).json({ err: 'not found' })
      const populated_lists = await populate_list(updatedUser.lists, UserList)
      return res
         .status(203)
         .json({
            updatedUser,
            deletedUserList,
            subscribed_lists: populated_lists,
         })
   } catch (e) {
      console.log(e)
      res.status(400).json({ err: e })
   }
}
