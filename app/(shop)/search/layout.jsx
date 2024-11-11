
import React from 'react'
import CategorySideBar from './_components/CategorySideBar'
import CategoryList from '@/app/components/CategoryList'

const layout = ({children}) => {
  return (
    <>
    <div className="md:hidden block"> <CategoryList/></div>
    <div className="grid grid-cols-1 md:grid-cols-5 mt-2 md:w-[95%] lg:w-[90%] mx-auto ">
        <div className="md:block hidden"><CategorySideBar/></div>
        <div className="md:col-span-4 sm:p-0 p-2">{children}</div>
    </div>
    </>
  )
}

export default layout