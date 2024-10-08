
import React from 'react'
import CategorySideBar from './_components/CategorySideBar'

const layout = ({children}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 mt-2 w-[100%] md:w-[80%] mx-auto ">
        <div className="md:block hidden"><CategorySideBar/></div>
        <div className="md:col-span-4">{children}</div>
    </div>
  )
}

export default layout