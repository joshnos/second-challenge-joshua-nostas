import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, updatePost } from "../features/posts/postsSlice";

function PostForm() {
  const [post, setPost] = useState({
    name: "",
    description: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const posts = useSelector((state) => state.posts);

  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (params.id) {
      dispatch(updatePost({ data: { ...post }, id: params.id }));
    } else {
      dispatch(
        createPost(post)
      );
    }

    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      setPost(posts.find((post) => post.id === params.id));
    }
  }, [params, posts]);

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
      <label className="block text-sm font-bold">Post:</label>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={post.name}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        placeholder="Write a name"
        autoFocus
      />
      <label>
        Description:
        <textarea
          type="text"
          name="description"
          onChange={handleChange}
          value={post.description}
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
          placeholder="Write a description"
        />
      </label>
      <button type="submit" className="bg-indigo-600 px-2 py-1">Submit</button>
    </form>
  );
}

export default PostForm;