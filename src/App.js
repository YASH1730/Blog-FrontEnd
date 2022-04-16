import './App.css';
import React,{useState} from 'react'
import Navbar from './components/Navbar';
import Card from './components/Card';
import Footer from './components/Footer';
import LogModal from './components/LogModal';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import About from './components/About';
// import SearchBar from 'cb-search-bar/dist/SearchBar'
import {setModal,auth,trackCard} from './context/Context.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AutoFixHighRounded } from '@mui/icons-material';
import SearchBar from './components/SearchBar';



function App() {

  const [stateModal,toogleModal] = useState(false);
  const [formType, setFormType ] = useState();
  const [tracker, setTracker ] = useState({uuid : null});
  
  const [cerdential,setCred] = useState({token : localStorage.getItem('token') ,userName : localStorage.getItem('name'),userEmail :localStorage.getItem('email')  });

 

  return (
    <>
     <BrowserRouter>
          <setModal.Provider value = {{stateModal,toogleModal,formType,setFormType}}>  
           <auth.Provider value = {{cerdential,setCred}}>  
           <trackCard.Provider value = {{tracker,setTracker}}>  
            {/* <Navbar/> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchBar />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<About />} />
            </Routes>
            <LogModal/>
           {/* <Footer/> */}
          </trackCard.Provider>
          </auth.Provider>
        </setModal.Provider>
    </BrowserRouter>
   
    </>
  );
}

export default App;

export {setModal,auth,trackCard};