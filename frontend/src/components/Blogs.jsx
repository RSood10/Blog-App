import { useEffect, useState } from "react";
import axios from "axios";

export function useBlogs() {
  // eslint-disable-next-line no-undef
  const token = sessionStorage.getItem("key");
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/blog/daily-blogs", {
        // headers: {
        //   Authorization: "Bearer" + "_" + token, //the token is a variable which holds the token
        // },
      })
      .then(function (response) {
        // handle success
        setBlogs(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [token]);
  // return <div>{blogs}</div>;
  return blogs;
}
