
import React from 'react'
import CategorySideBar from './_components/CategorySideBar'

const layout = ({children}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 mt-2 md:w-[95%] lg:w-[90%] mx-auto ">
        <div className="md:block hidden"><CategorySideBar/></div>
        <div className="md:col-span-4">{children}</div>
    </div>
  )
}

export default layout