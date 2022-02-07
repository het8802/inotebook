import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home.js";
import About from "./components/About.js";
import NoteState from "./context/notes/NoteState.js";
import Login from "./components/Login";
import Signup from "./components/Signup";



function App() {
  document.body.style.backgroundImage = `url('https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')`
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.minHeight = '100%';
    document.body.style.margin = '0px';
    document.body.style.width = '100%';


  return (
    <>
    <NoteState>
      <Router>

        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
        </Routes>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
