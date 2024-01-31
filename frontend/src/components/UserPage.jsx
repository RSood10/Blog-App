import { useRecoilValue } from "recoil";
import {
  usernameAtom,
  // firstnameAtom,
  // lastnameAtom,
} from "../state/Atom/userAtom";
import { NavBar } from "./Navbar";
import { Footer } from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserPage() {
  const username = useRecoilValue(usernameAtom);
  // const Firstname = useRecoilValue(firstnameAtom);
  // const Lastname = useRecoilValue(lastnameAtom);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("key");
    axios
      .get("http://localhost:3000/api/blog/user-specific", {
        headers: {
          authorization: "Bearer" + " " + token, //the token is a variable which holds the token
        },
      })
      .then(function (response) {
        if (response.data == "No user blogs found")
          throw new Error(alert("No user blogs found"));
        // sessionStorage.setItem("key", response.data.payload);
        setBlogs(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <>
      <NavBar />
      <div className="userDetails">
        <div className="userprofile"></div>
        <h2>User-Name : {username}</h2>
      </div>
      <div className="box-blog">
        <div className="Blogs-container">
          <div className="blog-init">
            {blogs.length > 0 ? (
              blogs.map((blog, indx) => {
                // console.log(blog.title, blog.description, blog.username);

                return (
                  <div key={indx} className="democard">
                    <div className="username">
                      <p>{blog.username}</p>
                    </div>
                    <h4>Title : {blog.title}</h4>
                    <div className="content">
                      <p>{blog.description}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>Loading . .. .</h1>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
