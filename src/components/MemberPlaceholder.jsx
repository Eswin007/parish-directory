import { faInfoCircle, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {motion } from 'framer-motion'
import React from 'react'

const MemberPlaceholder = () => {
  return (
    <motion.div className='member-placeholder'
      initial={{opacity: 0, duration: .2}}
      animate={{opacity:1, duration: .2}}
      exit={{opacity:0, duration: .2}}
    >
        <FontAwesomeIcon icon={faInfoCircle}  className='member-placeholder__icon'/>
        <span>Select a member to view the details</span>
    </motion.div>
  )
}

export default MemberPlaceholder