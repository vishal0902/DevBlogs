import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import {Blogs} from "./pages/Blogs"
import BlogInDetail from "./pages/BlogInDetail"
import { Publish } from "./pages/Publish"


function App() {

  return (<div>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/blog/:id" element={<BlogInDetail />}></Route>
        <Route path="/blog/publish" element={<Publish />}></Route>
      </Routes>
    </BrowserRouter>
  </div>)
}

export default App
