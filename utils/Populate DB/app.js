const MONGODB =
   'mongodb://rushadmin:vUyKhSLfjGFr7Lxg@cluster0-shard-00-00.e8k8d.mongodb.net:27017,cluster0-shard-00-01.e8k8d.mongodb.net:27017,cluster0-shard-00-02.e8k8d.mongodb.net:27017/myFirstDatabase?authSource=admin&replicaSet=atlas-zqchz7-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
const mongoose = require('mongoose')
const axios = require('axios')
const Word = require('./models/Word')
const List = require('./models/List')
const base_url = 'https://api.dictionaryapi.dev/api/v2/entries/en'
const data = require('./data')

main().catch((err) => console.log(err))

async function main() {
   await mongoose.connect(MONGODB)
   const { green_art_literature:list } = data
   const parent_id = await createNewList(list.list)
   await add_new_words(list.words, parent_id )
   console.log('done')
}

async function createNewList(list_obj) {
   const list = new List(list_obj)
   await list.save()
   return list._id
}

async function add_new_words(words, parent_id) {
   const n = words.length
   for (let i = 0; i < n; i++) {
      await createNewWord(words[i], parent_id)
      await timeout(350)
      console.log('done ', i)
   }
}


async function createNewWord({ word, meaning }, parent_id) {
   try {
      let word_object = { word, meaning }
      word_object = await populateWord(word_object)
      const new_word = new Word(word_object)
      await new_word.save()
      const parent = await List.findById(parent_id)
      if (!parent.words.includes(new_word._id)) {
         parent.words.push(new_word._id)
         await parent.save()
      }
   } catch (e) {
      console.log(e)
   }
}

async function populateWord(word) {
   try {
      let word_data = await axios.get(base_url + '/' + word.word)
      word_data = word_data.data
      let definitions = [],
         examples = [],
         synonymes = []
      word_data.forEach((chunck) => {
         const { meanings } = chunck
         const curr_definitions = meanings.map((m) => [
            m.partOfSpeech,
            m.definitions[0].definition,
         ])
         const curr_examples = meanings.map((m) => [
            m.partOfSpeech,
            m.definitions[0].example,
         ])
         const curr_synonymes = meanings.map((m) => m.synonyms.slice(0, 2))
         definitions = [...definitions, ...curr_definitions]
         examples = [...examples, ...curr_examples]
         synonymes = [...synonymes, ...curr_synonymes]
      })
      word_data = { definitions, examples, synonymes }
      const res = { ...word, ...word_data }
      return res
   } catch (e) {
      console.log('Error in word: ');
      console.log(word);
      console.log(e)
      return word
   }
}

function timeout(ms) {
   return new Promise((resolve) => setTimeout(resolve, ms))
}
