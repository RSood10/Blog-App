import { useState } from "react";
import "../styling/App.css";
import { ShowProfile } from "./ShowProfile";
import { useNavigate } from "react-router-dom";
import { Menu } from "./Menu";

export function NavBar() {
  const check = sessionStorage.getItem("key");
  const [pvisible, setPVisible] = useState(false);
  const [seemenu, setSeeMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="navbox">
      <div className="hambar ">
        <img
          src={"ham.png"}
          alt="image"
          onClick={() => {
            console.log("ham clicked");
            setSeeMenu(!seemenu);
          }}
        />
        {seemenu && <Menu />}
      </div>
      <div>
        <h3>Daily-Blog</h3>
      </div>
      <div className="logbutton">
        {check ? (
          <button
            className="profilebar"
            onClick={() => {
              setPVisible(!pvisible);
            }}
          >
            Pro
          </button>
        ) : (
          <button className="mainsigninbtn" onClick={() => navigate("/signin")}>
            Sign-In
            <div className="arrow-wrapper">
              <div className="arrow"></div>
            </div>
          </button>
        )}
        {pvisible && <ShowProfile setPVisible={setPVisible} />}
      </div>
    </div>
  );
}
