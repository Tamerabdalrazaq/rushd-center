import Word from '../../../models/Word'
import connectDb  from '../../../utils/connectDb'

connectDb()

export default async function (req, res) {
    switch(req.method){
        case ("GET"):
            await getWord(res, req.query._id)
            break;
        case("DELETE"): 
            await deleteWord(res, req.query._id, req.body)
            break;
    }
}

async function getWord(res, wordId) {
    try {
        const word = await Word.findById(wordId);
        if(!word) return res.status(404).json({err: 'Word not found.'});
        res.status(200).json({ word })
    } catch(e) {
        console.log(e);
        res.status(400).json({error: e})
    }
}

async function deleteWord( res, wordId ){
    try{
        const deletedWord = await Word.findByIdAndDelete(wordId)
        if(!deletedWord) return res.status(404).json({err: 'not found'})
        return res.status(203).json({deletedWord})
    } catch(e) {
        console.log(e)
        res.status(400).json({err: e})
    }
}