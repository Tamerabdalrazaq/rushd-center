import Word from 'models/Word'
import connectDb from 'utils/connectDb'

connectDb()

export default async function (req, res) {
   if (req.method === 'POST') {
      try {
         const words = await Word.find({ _id: { $in: req.body.wordsIds } })
         res.json({ words })
      } catch (e) {
         res.status(400).json({ error: e })
      }
   }
}
