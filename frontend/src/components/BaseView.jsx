import Typed from "typed.js";
import { useRef, useEffect } from "react";
import "../styling/App.css";
import { Tilt } from "react-tilt";
import { CreateBlog } from "./CreateBlog";

export function BaseView() {
  const defaultOptions = {
    reverse: true, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 505, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };
  return (
    <div className="front">
      <div className="midsection">
        <div>
          <MyComponent />
        </div>
        <Tilt options={defaultOptions}>
          <div className="democard">
            <div className="username">
              <p>demo User</p>
            </div>
            <h4>Title : Welcome</h4>
            <div className="content">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                nesciunt esse, quibusdam nobis eum cumque eius quae similique
                ullam earum.
              </p>
            </div>
          </div>
        </Tilt>
      </div>
      <CreateBlog />
    </div>
  );
}

function MyComponent() {
  // Create reference to store the DOM element containing the animation
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["<b> Welcome To ... </b>", "<b>Explore ...</b>"],
      typeSpeed: 80,
      loop: true,
      loopCount: Infinity,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <div className="typingtext">
      <span ref={el} />
      <p>
        The World of Blogs.
        <br /> Share Views, Incidents and More
      </p>
    </div>
  );
}
