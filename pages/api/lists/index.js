import List from 'models/List'
import connectDb  from 'utils/connectDb'

connectDb()

export default async function (req, res) {
    switch(req.method ){
        case('POST'):
            createList(req, res)
            break;
        case("GET"):
            await  getAllLists(res);
            break;
        case("DELETE"):
            deleteList(req, res)
            break;
    }
}

async function getAllLists(res) {
    try{
        const lists = await List.find({});
        res.json({lists})
    } catch(e) {
        res.status(400).json({error: e})
    }
}
async function createList(req, res) {
    try {
        const newList = await List.create(req.body);
        res.status(201).json({res: newList})
    } catch (e) {
        console.log(e);
        res.status(400).json({err: e})
    }
}

async function deleteList(req, res) {
    try{
        const deletedList = await List.findByIdAndDelete(req.body._id);
        res.status(203).json(deletedList);
    } catch(e) {
        console.log(e);
        res.status(400).json({err: e})
    }
}