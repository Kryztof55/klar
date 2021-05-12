import React from 'react'
import style from './style.scss'

const Modal = props => {
    const { show, closeModal, header, children } = props;
    return(
        <div className={show ? "overlay" : "hide"}>
            <div className={show ? "show modal" : "hide modal"}>
                <header className="header-modal">
                    <h5 className="modal-title">{header}</h5>
                    <button className="btn" onClick={closeModal}>
                        <i className="material-icons">highlight_off</i>
                    </button>       
                </header>
                <div className="modal-body text" color-theme="white">{children}</div>
            </div>
        </div>
    )
    
}
export default Modal;