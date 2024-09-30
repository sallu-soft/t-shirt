import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CategoryCard = ({category}) => {
    
  return (
   <div className="bg-primary_color justify-center text-secondary_color flex p-3">{category}</div>
  )
}

export default CategoryCard