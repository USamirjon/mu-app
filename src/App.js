import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import './App.css'
import {Signup,Login} from './signup';
import './server.ts'
import Home from './Home';
import ApartmentDetail from "./ApartmentDetail";
import 'bootstrap/dist/css/bootstrap.min.css';
import Filter from './Filter';
import Profile from './profile';
import Footer from './Footer';
import EditApartment from "./Edit-Apartment";
import CreateApartment from "./createApart";

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Signup" element={<Signup/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    <Route path="/Filter" element={<Filter/>}/>
                    <Route path="/Profile" element={<Profile/>}/>
                    <Route path="/CreateApartment" element={<CreateApartment/>}/>
                    <Route path="/apartment/:id" element={<ApartmentDetail />} /> {/* Страница с подробной информацией */}
                    <Route path="/edit-apartment/:id" element={<EditApartment />} />
                </Routes>
                <br/>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
