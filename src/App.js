import React, { useState } from 'react';
import {
    Route, Routes
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import User from './pages/User';
import LoadingBar from 'react-top-loading-bar';
import { useToasts } from 'react-toast-notifications';


const App = () => {
    const [progress, setProgress] = useState(0);
    const { addToast } = useToasts();

    return (
        <>
            <LoadingBar
                color='#F24C4C'
                progress={progress}
                height='4px'
                shadow='true'
                onLoaderFinished={() => setProgress(0)}
            />
            <Routes>
                <Route exact path='/' element={<Home setLoader={setProgress} notification={addToast}/>} />
                <Route exact path="/auth/login" element={<Login setLoader={setProgress} notification={addToast} />} />
                <Route exact path='/auth/register' element={<Register setLoader={setProgress} notification={addToast} />} />
                <Route exact path='/user' element={<User setLoader={setProgress} notification={addToast} />} />
            </Routes>
        </>
    )
}

export default App;
