import {BrowerRouter, Routes, Route} from 'react-router-dom';
import App from './App';
import Login from './components/Login';



const Router = () =>{
    return(
        <BrowerRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/directory' element={<App />} />

            </Routes>
        </BrowerRouter>
    )
}