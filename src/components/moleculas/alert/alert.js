import React from 'react'

const Alert = props => {
    const {theme, text, children} = props
    return(
        <div className={theme} role="alert">{text}{children}</div>
    )
}
export default Alert