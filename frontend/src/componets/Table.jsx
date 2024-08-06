import React, { useEffect, useState } from 'react'
import PageLoader from './PageLoader'

const Table = (props) => {
    const { setEditModal, setdeleteModal, tableRow, settableRow } = props
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            let res = await fetch(`${import.meta.env.VITE_API_URL}`)
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            let data = await res.json();
            settableRow(data)
            setLoader(false)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            {loader ?
                <section className='flex w-full h-full justify-center items-center'>
                    <PageLoader />
                </section> :
                <div className="relative overflow-auto h-fit rounded sm:pe-3">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-xl rounded-lg overflow-hidden">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-300 sticky top-0 z-10">
                            <tr>
                                <th scope="col" className="pl-2 sm:pl-4 px-2 sm:px-6 py-3 font-medium">
                                    S NO
                                </th>
                                <th scope="col" className="pl-2 sm:pl-4 px-2 sm:px-6 py-3 font-medium ">
                                    Title
                                </th>
                                <th scope="col" className="pl-2 sm:pl-4 px-2 sm:px-6 py-3 font-medium">
                                    Description
                                </th>
                                <th scope="col" className="pl-2 sm:pl-4 px-2 sm:px-6 py-3 font-medium">
                                    Edit
                                </th>
                                <th scope="col" className="pl-2 sm:pl-4 px-2 sm:px-6 py-3 font-medium">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRow.map((i, index) => {
                                return (
                                    <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                                        <th scope="row" className="pl-2 sm:pl-4 px-2 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {index + 1}
                                        </th>
                                        <td className="pl-2 sm:pl-4 px-2 sm:px-6 py-4 text-left">
                                            {i.tittle}
                                        </td>
                                        <td className="pl-2 sm:pl-4 px-2 sm:px-6 py-4 text-left">
                                            {i.description}
                                        </td>
                                        <td className="pl-2 sm:pl-4 px-2 sm:px-6 py-4 text-left">
                                            <a href="#" className="font-medium text-blue-600 hover:underline" onClick={() => setEditModal(i)}>Edit</a>
                                        </td>

                                        <td className="pl-2 sm:pl-4 sm:px-6 py-4 text-left">
                                            <a href="#" className="font-medium text-red-600 hover:underline" onClick={() => setdeleteModal(i)}>Delete</a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>


            }
        </>
    )
}

export default Table