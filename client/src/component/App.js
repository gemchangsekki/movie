import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./Footer/footer";
import Items from "./Items/items";
import Landingpage from "./Landingpage/landingpage";
import Navbar from "./NavBar/navbar";
import Detail from "./Detail/Detail";
import ExTable from "./example/ExTable";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <div style={{minHeight : '100vh'}}>
        <Router>
          <Routes>
            <Route path="/" element ={<Landingpage/>} />
            <Route path='/movie/:movieId' element={<Detail/>}/>
            <Route path="/items" element ={<Items/>} />
            <Route path="/example/table" element ={<ExTable/>} />
          </Routes>
        </Router>
      </div>
      <Footer/>
    </div>
  );
}

export default App;