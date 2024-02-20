import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./navbar/navbar";
import { ViewPosts } from "./component/ViewPosts";
import { EditPost } from "./component/EditPost";
import { CreatePost } from "./component/CreatePost";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ViewPosts />}></Route>
        <Route path="/eidt/:id" element={<EditPost />}></Route>
        <Route path="/createPost" element={<CreatePost />}></Route>
      </Routes>
    </>
  );
}

export default App;
