import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

// Components
import PostsList from "./components/postsList";
import PostForm from "./components/postForm";

function App() {
  return (
    <div className="h-screen">
      <div className="flex items-center justify-center h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/create-post" element={<PostForm />} />
            <Route path="/edit-post/:id" element={<PostForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
