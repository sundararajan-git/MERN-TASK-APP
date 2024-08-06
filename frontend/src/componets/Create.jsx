import React, { useState } from 'react'
import BtnLaoder from './BtnLaoder'
import toast, { Toaster } from 'react-hot-toast'

const Create = (props) => {
  const { settableRow } = props
  const [btnLoader, setBtnLoader] = useState(false)
  const createHandler = async () => {
    try {

      let tittle = document.getElementById("title")
      let description = document.getElementById("description")


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
      let res = await fetch(`${import.meta.env.VITE_API_URL}`, {
        method: 'POST',
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
        return [...prev, mainOBj]
      })
      tittle.value = ""
      description.value = ""
      setBtnLoader(false)
      toast.success("Created !")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='p-4'>
      <div className='flex flex-col gap-2'>
        <label htmlFor="title" className=''>Title</label>
        <input type="text" className="border border-gray-400 rounded-lg p-2 focus:border-green-600 focus:ring-1 focus:ring-green-600 text-gray-500 outline-none" name="title" id="title" placeholder='Title' />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="description" className=''>Description</label>
        <input type="text" name='description' id='description' className='border border-gray-400 rounded-lg p-2 focus:ring-green-600 text-gray-500 focus:border-green-600 focus:ring-1 outline-none ' placeholder='Description' />
      </div>

      <div>
        <button type='button' className='flex bg-green-500 text-white px-1 py-0.5 rounded float-right mt-4 mb-4' onClick={createHandler}>Create
          {btnLoader ? <BtnLaoder /> : <></>}
        </button>
      </div>
      <Toaster />
    </div>
  )
}

export default Create