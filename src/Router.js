import App from './App.js';
import Profile from './Profile.js';
import AddFriends from './AddFriends.js';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

//index.js --> Router.js --> App.js

function Router(){
    return (
        <BrowserRouter> 
           <Routes>
               <Route path="/" element={ <App />} />
               <Route path="/profile" element={ <Profile />} />
               <Route path="/addfriends" element={ <AddFriends />} />
           </Routes>
        </BrowserRouter>
    )
}

export default Router;