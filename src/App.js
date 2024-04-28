import React from 'react'
import QrCode from './qrCode/QrCode'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <div>
            <QrCode />

            <ToastContainer />
        </div>
    )
}

export default App

