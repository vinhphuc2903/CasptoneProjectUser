import React from 'react';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import style from './Toastify.module.scss';
import 'react-toastify/dist/ReactToastify.css';

function ToastifyCommon(props) {
    const { position = 'top-right', autoClose = 3000, hideProgressBar=false, newestOnTop = false ,pauseOnFocusLoss = false ,icon} = props;
    return (
        <>
            <ToastContainer
                position={position}
                autoClose={autoClose}
                hideProgressBar={hideProgressBar}
                newestOnTop={newestOnTop}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={pauseOnFocusLoss}
                draggable
                pauseOnHover={false}
                icon={icon}
                className={style.className}
                theme="light"
            />
        </>
    );
}

ToastifyCommon.propsType={
    position:PropTypes.string,
    autoClose:PropTypes.number,
    hideProgressBar:PropTypes.bool,
    pauseOnHover:PropTypes.bool,
}
export default ToastifyCommon;