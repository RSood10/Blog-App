import { useEffect, useState } from "react";
import axios from "axios";
import "../styling/App.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { titleAtom, descAtom } from "../state/Atom/blogAtom";
import { usernameAtom } from "../state/Atom/userAtom";

export function CreateBlog() {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);
  const [title, setTitle] = useRecoilState(titleAtom);
  const [desc, setDesc] = useRecoilState(descAtom);
  const username = useRecoilValue(usernameAtom);
  const check_user_status = () => {
    if (!sessionStorage.getItem("key")) alert("Login in to create");
    else setShow(!show);
    // show ? setShow(true) : setShow(false);
    // if (show) setShow(false);
    // else setShow(true);
  };
  useEffect(() => {
    if (done) {
      axios
        .post("http://localhost:3000/api/blog/add", {
          username: username,
          title: title,
          description: desc,
        })
        .then(function (response) {
          if (response.data == "no data")
            throw new Error(alert("Inputs not valid"));
          // sessionStorage.setItem("key", response.data.payload);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      setDone(false);
    }
  }, [title, desc, username, done]);
  const ondone = () => {
    if (title && desc) {
      setDone(true);
      setTimeout(() => {
        setShow(false);
        console.log(title, desc);
      }, 2000);
    } else alert("Fill the Title/Desc to move further");
  };
  return (
    <div className="create">
      <button className="createbutton" onClick={check_user_status}>
        <span className="btn-text-one">CREATE</span>
        <span className="btn-text-two">LETS GO!</span>
      </button>
      {show && (
        <div className="bloginputs">
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />

          <textarea
            name="desc"
            id="desc"
            cols="50"
            rows="10"
            placeholder="Description"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            required
          />
          <button onClick={ondone}>Post</button>
        </div>
      )}
    </div>
  );
}
