import React, {useEffect, useState} from 'react'

const ToggleSwitch = ({label, fieldName, checked, disabled, onChange}) => {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(()=>{
        setIsChecked(checked)
    }, [checked]);
    
    
    return (
    <label htmlFor={fieldName} className="switch">
        <span className="switch__label">{label}</span>
        <input
            className='switch__input' 
            type="checkbox" 
            name={fieldName} 
            id={fieldName} 
            checked={isChecked} 
            onChange={onChange}
            hidden
        />
        <span className='switch__control'></span>
    </label>
  )
}

export default ToggleSwitch;