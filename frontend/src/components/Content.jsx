import { useBlogs } from "./Blogs";
import "../styling/App.css";

export function Content() {
  const blogs = useBlogs();
  console.log(blogs);
  return (
    <div className="box-blog">
      <div className="Blogs-container">
        <div>
          {" "}
          <h1>Daily Blog just for U</h1>
        </div>
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
  );
}
