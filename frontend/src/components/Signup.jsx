import { useEffect, useState } from "react";
import "../styling/App.css";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  usernameAtom,
  passwordAtom,
  firstnameAtom,
  lastnameAtom,
} from "../state/Atom/userAtom";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useRecoilState(usernameAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [firstname, setFirstname] = useRecoilState(firstnameAtom);
  const [lastname, setLastname] = useRecoilState(lastnameAtom);
  const navigate = useNavigate();
  const [sumbit, setSumbit] = useState(false);
  // const ref = useRef();

  useEffect(() => {
    // ref.current.focus();
    if (sumbit) {
      axios
        .post("http://localhost:3000/api/user/signup", {
          username: username,
          firstname: firstname,
          lastname: lastname,
          password: password,
        })
        .then(function (response) {
          // console.log(response);
          if (response.data == "no data")
            throw new Error(alert("Email Already exist/Inputs not valid"));
          // sessionStorage.setItem("key", response.data.payload);
          setTimeout(() => {
            navigate("/signin");
          }, 1000);

          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [sumbit, password, username, lastname, firstname, navigate]);
  return (
    <div className="signup-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSumbit(true);
        }}
        className="card"
      >
        <div>
          <h5>SignUp</h5>
          <br />
          <h6>To Our Application</h6>
        </div>
        <input
          type="text"
          placeholder="Email/username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          // ref={ref}
          required
        />
        <input
          type="text"
          placeholder="Firstname"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
          required
        />
        <input
          type="text"
          placeholder="Lastname"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          minLength={6}
        />

        <button>Enter</button>
        <a
          href="/signin"
          style={{ color: "#0b1623", paddingLeft: "1rem", fontSize: "large" }}
        >
          Alread have One Signin -
        </a>
      </form>
    </div>
  );
}
