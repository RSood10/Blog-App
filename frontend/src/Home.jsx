// import { Blogs } from "./components/Blogs";
import { NavBar } from "./components/Navbar";
import { BaseView } from "./components/BaseView";
import { Footer } from "./components/Footer";
import { Content } from "./components/Content";
// import UserList from "./components/UserList";

export default function Home() {
  return (
    <>
      <NavBar />
      <BaseView />
      <Content />
      {/* <UserList /> */}

      <Footer />
    </>
  );
}
