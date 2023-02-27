import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost } from "../features/posts/postsSlice";

function PostsList() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div className="w-4/6">
      <header className="flex justify-between items-center py-4">
        <h1>Posts ({posts.length})</h1>

        <Link
          to="/create-post"
          className="bg-indigo-600 px-2 py-1 rounded-sm text-sm shadow-sm"
        >
          Create Post
        </Link>
      </header>

      <div className="grid grid-cols-3 gap-3">
        {posts.map((post) => (
          <div className="bg-neutral-800 p-4 rounded-md" key={post.id}>
            <header className="flex justify-between">
              <h3 className="text-lg font-bold">{post.name}</h3>
              <div className="flex gap-x-2">
                <Link
                  to={`/edit-post/${post.id}`}
                  className="bg-zinc-600 px-2 py-1 text-xs rounded-md self-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-500 px-2 py-1 text-xs rounded-md"
                >
                  delete
                </button>
              </div>
            </header>
            <p>{post.description}</p>
            <p className="text-xs text-slate-400">{post.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostsList;