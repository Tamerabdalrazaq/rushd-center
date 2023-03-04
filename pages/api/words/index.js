import Word from "../../../models/Word";
import List from "../../../models/List";
import connectDb from "../../../utils/connectDb";

connectDb();

export default async function (req, res) {
   if (req.method === "POST") {
      const { parentId } = req.body;
      try {
         const newWord = new Word(req.body);
         const updatedList = await List.findByIdAndUpdate(
            parentId,
            {
               $push: {
                  words: newWord._id,
               },
            },
            { new: true }
         );
         if (!updatedList)
            return res.status(400).json({ error: "List not found" });
         await newWord.save();
         res.status(201).json({ res: updatedList, newWord });
      } catch (e) {
         res.status(400).send({ error: e });
      }
   } else if (req.method === "GET") {
      try {
         const words = await Word.find({});
         res.json({ words });
      } catch (e) {
         res.status(400).json({ error: e });
      }
   }
}
