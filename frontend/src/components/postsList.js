import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deletePost } from "../features/posts/postsSlice";

function PostsList() {
  const posts = useSelector((state) => state.posts);
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  const changeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setFilteredPosts(searchTerm.length > 0 ? posts.filter((post) => post.name.toLowerCase().includes(searchTerm.toLowerCase())) : posts);
  }, [posts, searchTerm]);

  return (
    <div className="w-4/6">
      <header className="flex justify-between items-center py-4">
        <h1>Posts ({filteredPosts.length})</h1>

        <input
          type="text"
          name="filter"
          onChange={changeSearchTerm}
          className="p-2 rounded-md bg-zinc-200 mb-2 w-3/6"
          placeholder="Write a name to filter the list"
          autoFocus
        />

        <Link
          to="/create-post"
          className="bg-green-600 px-2 py-1 rounded-sm text-sm shadow-sm text-white"
        >
          Add Post
        </Link>
        
      </header>

      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.name}</td>
              <td>{post.description}</td>
              <td>
                <Link
                  to={`/edit-post/${post.id}`}
                  className="bg-zinc-600 px-2 py-1 mx-5 text-xs rounded-md self-center text-white"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 px-2 py-1 text-xs rounded-md text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostsList;