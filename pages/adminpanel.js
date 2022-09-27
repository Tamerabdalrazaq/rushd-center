import axios from 'axios'
import ScoresTable from 'components/scores/ScoresTable'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import structures from '../data/table'


function AdminPanel() {
    const [forms, setForms] = useState([])
    useEffect(() => {
        async function fetch_data( ){
            let res = await axios.get('/api/register')
            setForms(res.data.forms)
        }
        fetch_data()
    }, [])
    
  return (
    <div>
        <ScoresTable data={forms} row_sections={structures.form_structure} />
    </div>
  )
}

export default AdminPanel