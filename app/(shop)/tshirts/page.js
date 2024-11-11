import { Button } from '@/components/ui/button'
import React from 'react'
import ReactImageMagnify from 'react-image-magnify'

const Tshirts = () => {
  
  return (
    <div className="fluid__image-container">
    <ReactImageMagnify {...{
        smallImage: {
            alt: 'Wristwatch by Ted Baker London',
            isFluidWidth: true,
            src: watchImg687,
        },
        largeImage: {
            src: watchImg1200,
            width: 1200,
            height: 1800
        },
        shouldUsePositiveSpaceLens: true
    }} />
</div>
  )
}

export default Tshirts