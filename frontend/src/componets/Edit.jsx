import React, { useState } from 'react'
import BtnLaoder from './BtnLaoder'
import toast, { Toaster } from 'react-hot-toast'

const Edit = (props) => {

  const { setEditModal, editModal, settableRow } = props
  const [btnLoader, setBtnLoader] = useState(false)

  const updateHandler = async () => {
    try {
      let tittle = document.getElementById("Uptitle")
      let description = document.getElementById("Updescription")

      if (!tittle.value || !description.value) {
        if (!tittle.value) {
          tittle.classList.add("border-red-600")
        } else {
          tittle.classList.remove("border-red-600")
        }

        if (!description.value) {
          !description.value && description.classList.add("border-red-600")
        } else {
          description.classList.remove("border-red-600")
        }

        toast.error("Invalid Input")
        return null
      }

      tittle.classList.remove("border-red-600")
      description.classList.remove("border-red-600")

      let mainOBj = {
        tittle: tittle.value,
        description: description.value
      }
      setBtnLoader(true)
      let res = await fetch(`${import.meta.env.VITE_API_URL}${editModal._id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(mainOBj)
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      let data = await res.json();
      settableRow((prev) => {
        let filterData = prev.map((i) => {
          if (i._id !== editModal._id) {
            return i
          } else {
            return { _id: editModal._id, ...mainOBj }
          }
        })
        return filterData
      })
      setBtnLoader(false)
      setEditModal(false)
      toast.success("Updated !")
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <section className='absolute top-0 left-0 right-0 z-50 bg-gray-400/50 w-full h-full min-h-screen flex justify-center items-center'>
      <div className='bg-white rounded-xl shadow-md w-full m-4 sm:m-0 sm:w-1/2 h-fit p-2'>
        <div className='border-b border-gray-200 pt-2 ps-2 pe-2 flex justify-between items-center'>
          <p className='text-green-500 font-medium'>Edit</p>
          <button type="button" className="text-gray-400 bg-transparent hover:text-red-600 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal" onClick={() => setEditModal(false)}>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <div className='p-4'>

          <div className='flex flex-col gap-2 pb-2'>
            <label htmlFor="Uptitle" className=''>Title</label>
            <input type="text" className="border border-gray-200 rounded-lg p-2 focus:border-green-600 focus:ring-1 focus:ring-green-600 text-gray-500 outline-none" name="title" id="Uptitle"
              defaultValue={editModal.tittle}
              placeholder='Title'
            />
          </div>

          <div className="flex flex-col gap-2 mt-2 pb-2">
            <label htmlFor="Updescription" className=''>Description</label>
            <input type="text" name='description' id='Updescription' className='border border-gray-200 rounded-lg p-2 text-gray-500 focus:ring-green-600 focus:ring-1 focus:border-green-600 outline-none' defaultValue={editModal.description} placeholder='Description' />
          </div>

          <div>
            <button type='button' className='bg-green-500 flex text-white px-1 py-0.5 rounded font-medium float-right mt-4 mb-3' onClick={updateHandler}>Update {btnLoader ? <> <BtnLaoder /> </> : <></>}</button>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  )
}

export default Edit



