// UserList.js
import { useNavigate } from "react-router-dom";
import { usernameAtom } from "../state/Atom/userAtom";
import { useRecoilValue } from "recoil";

const UserList = () => {
  //   const history = useHistory();
  const Navigate = useNavigate();
  const username = useRecoilValue(usernameAtom);

  const handleProfileClick = (customname) => {
    // Navigate to the user profile page with the user's name as a parameter
    Navigate(`/${customname}`);
  };

  return (
    <div>
      <button
        onClick={() => {
          handleProfileClick(username);
          console.log(username);
        }}
        className="userpagebtn"
      >
        Your Blogs
      </button>
    </div>
  );
};

export default UserList;
