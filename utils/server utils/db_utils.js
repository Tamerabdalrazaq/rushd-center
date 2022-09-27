export async function populate_list (list, model){
    const populated_lists = await model.find({
        _id: {
           $in: list,
        },
     })
     return populated_lists
}