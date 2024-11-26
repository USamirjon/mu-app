import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import './App.css'
import {Signup,Login} from './signup';
import './server.ts'
import Home from './Home';
import AboutAd from "./aboutAd";
import 'bootstrap/dist/css/bootstrap.min.css';
import Filter from './Filter';

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Signup" element={<Signup/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/aboutad" element={<AboutAd/>}/>
                    <Route path="/Filter" element={<Filter/>}/>

                </Routes>
            </div>
        </Router>
    );
}

export default App;
