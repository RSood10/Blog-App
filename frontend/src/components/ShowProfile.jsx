import "../styling/App.css";
import { usernameAtom } from "../state/Atom/userAtom";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";

// eslint-disable-next-line react/prop-types
export function ShowProfile({ setPVisible }) {
  const date = new Date();
  const navigate = useNavigate();
  const Username = useRecoilValue(usernameAtom);
  return (
    <div className="profilebox">
      <div className="date-close">
        <p>{date.toDateString()}</p>
        <button
          className="close"
          onClick={() => {
            setPVisible(false);
          }}
        >
          X
        </button>
      </div>
      <div className="name-signout-upage">
        <div className="username-full">
          <h3>{Username}</h3>
        </div>
        <UserList />
        <div className="signout">
          <button
            onClick={() => {
              setTimeout(() => {
                sessionStorage.clear();
                navigate("/signin");
              }, 1000);
            }}
          >
            Log-Out
          </button>
        </div>
      </div>
    </div>
  );
}
