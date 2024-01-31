import { RecoilRoot } from "recoil";
import "./styling/App.css";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from "./components/UserPage";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/:customname" element={<UserPage />}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
