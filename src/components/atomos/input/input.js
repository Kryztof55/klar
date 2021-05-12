import React from 'react'

const Input = props =>{
    const {value, inputType,className, placeholder, required, onChange, id} = props;
    return(
        <input id={id} value={value} type={inputType} className={className} placeholder={placeholder} required={required} onChange={onChange}></input>
    )
}
export default Input