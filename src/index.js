import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import store from "./reducer/store";
import {Provider} from 'react-redux'
import {LocalizationProvider} from "@mui/x-date-pickers";
import PopUp from "./reducer/PopUpSlice";
import PopUpComponent from "./components/PopUp";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <PopUpComponent/>
                <App/>
            </LocalizationProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
