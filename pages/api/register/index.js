import Form from '../../../models/Form'
import connectDb from '../../../utils/connectDb'

connectDb()

export default async function (req, res) {
   if (req.method === 'POST') {
      try {
         const newForm = await Form.create(req.body)
         res.status(201).json({ res: newForm })
      } catch (e) {
         res.status(400).json({ e })
         console.log(e)
      }
   } else if (req.method === 'GET') {
      try {
         const forms = await Form.find({})
         res.json({ forms })
      } catch (e) {
         res.status(400).json({ error: e })
      }
   }
}
