import { useEffect, useState } from "react";
import axios from "axios";
import "../styling/App.css";
import { useRecoilState } from "recoil";
import { passwordAtom, usernameAtom } from "../state/Atom/userAtom";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [username, setUsername] = useRecoilState(usernameAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [sumbit, setSumbit] = useState(false);
  const navigate = useNavigate();
  // const ref = useRef();

  useEffect(() => {
    // ref.current.focus();
    if (sumbit) {
      axios
        .post("http://localhost:3000/api/user/signin", {
          username: username,
          password: password,
        })
        .then(function (response) {
          if (response.data == "no data")
            throw new Error(alert("Inputs not valid"));
          sessionStorage.setItem("key", response.data.payload);
          console.log(response.data);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch(function (error) {
          console.log(error);
        });
      setSumbit(false);
    }
  }, [username, password, sumbit, navigate]);
  return (
    <div className="signin-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSumbit(true);
        }}
        className="card"
      >
        <div>
          <h5>SignIn</h5>
          <br />
          <h6>To Our Application</h6>
        </div>
        <input
          type="text"
          placeholder="Email/Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          // ref={ref}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          minLength={6}
          required
        />
        <button>Done</button>
        <a
          href="/signup"
          style={{ color: "#0b1623", paddingLeft: "1rem", fontSize: "large" }}
        >
          Create New Account -
        </a>
      </form>
    </div>
  );
}
