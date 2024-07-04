import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./Footer/footer";
import Items from "./Items/items";
import Landingpage from "./Landingpage/landingpage";
import Navbar from "./NavBar/navbar";
import Detail from "./Detail/Detail";

function App() {
  return (
        <Router basename={process.env.PUBLIC_URL}>
    <div className="App">
      <Navbar/>
      <div style={{minHeight : '100vh'}}>
          <Routes>
            <Route path="/" element ={<Landingpage/>} />
            <Route path='/detail/:movieId/' element={<Detail/>}/>
            <Route path="/items/" element ={<Items/>} />
          </Routes>
      </div>
      <Footer/>
    </div>
        </Router>
  );
}

export default App;