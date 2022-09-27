import User from 'models/User'
const mongoose = require('mongoose')
import connectDb from 'utils/connectDb'

connectDb()

export default async function (req, res) {
   switch (req.method) {
      case 'GET':
         await getScores(res, req.query._id)
         break
      case 'POST':
         await addScore(res, req.query._id, req.body.score)
         break
      case 'DELETE':
         await removeScore(res, req.query._id, req.body._id)
         break
   }
}

async function getScores(res, userId) {
   try{
      const user = await User.findById(userId)
      if(!user) return res.status(404).json({err: 'Not Found.'}) 
      return res.status(200).json(user.scoresList);
   } catch(e) {
      console.log(e)
      res.status(400).json({ error: e })
   }
}

async function addScore(res, userId, score) {
   try {
      const user = await User.findByIdAndUpdate(
         userId,
         {
            $push: {
               scoresList: { ...score, _id: new mongoose.Types.ObjectId() },
            },
         },
         { new: true }
      )
      if (!user) return res.status(404).json({ err: 'User not found.' })
      res.status(200).json({ user })
   } catch (e) {
      console.log(e)
      res.status(400).json({ error: e })
   }
}

async function removeScore(res, userId, scoreId){
   try {
      const updatedUser = await User.findByIdAndUpdate(
         userId,
         {
            $pull: { scoresList: { _id: mongoose.Types.ObjectId(scoreId) } }
         },
         { new: true }
      )
      if (!updatedUser) return res.status(404).json({ err: 'not found' })
      return res.status(200).json({ updatedUser })
   } catch (e) {
      console.log(e)
      res.status(400).json({ err: e })
   }
}
