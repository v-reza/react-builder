import React from 'react'
import { Children } from '../utils/type'

const MasterLayout = (props: Children) => {
  


  return (
    <div className='w-full h-full bg-[#F3F5FA] min-h-screen'>
      {props.children}
    </div>
  )
}

export default MasterLayout
