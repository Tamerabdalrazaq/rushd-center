import axios from 'axios'

export async function sendForm(data) {
   try {
      var today = new Date()
      var date =
         today.getFullYear() +
         '-' +
         (today.getMonth() + 1) +
         '-' +
         today.getDate()
      var _time = today.getHours() + ':' + today.getMinutes()
      const time = date + ' __ ' + _time
      await axios.post('/api/register', { ...data, time })
      return true
   } catch (e) {
      console.log(e)
      return false
   }
}
