import { faInfoCircle, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const MemberPlaceholder = () => {
  return (
    <div className='member-placeholder'>
        <FontAwesomeIcon icon={faInfoCircle}  className='member-placeholder__icon'/>
        <span>Select a member to view the details</span>
    </div>
  )
}

export default MemberPlaceholder