import React, { useState } from 'react'
import "./App.css"
import Header from './componets/Header'
import Create from './componets/Create'
import Table from './componets/Table'
import Edit from './componets/Edit'
import Delete from './componets/Delete'

const App = () => {

  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setdeleteModal] = useState(false)
  const [tableRow, settableRow] = useState([])

  return (
    <section className='flex items-center flex-col gap-6'>
      <div className='bg-white w-3/4 rounded-lg shadow'>
        <Header />
      </div>
      <div className='flex justify-between sm:flex-row flex-col gap-4 w-full h-full'>
        <div className='bg-white w-full rounded-lg shadow'>
          <Create settableRow={settableRow} />
        </div>
        <div className='w-full'>
          <Table setEditModal={setEditModal} setdeleteModal={setdeleteModal} tableRow={tableRow} settableRow={settableRow} />
        </div>
      </div>


      {editModal ?
        <Edit setEditModal={setEditModal} editModal={editModal} settableRow={settableRow} /> : <></>
      }

      {deleteModal ?
        <Delete setdeleteModal={setdeleteModal} settableRow={settableRow} deleteModal={deleteModal}  /> : <></>}

    </section>
  )
}

export default App