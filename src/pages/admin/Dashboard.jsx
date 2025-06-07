import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/dashboard.css';
import { BiShow, BiEdit, BiTrash } from 'react-icons/bi';
import { PiSquaresFour } from 'react-icons/pi';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'AUTHOR') {
      alert('You are not authorized to access the Dashboard.');
      navigate('/posts');
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPosts(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch posts');
        if (err.response?.status === 401) navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/posts/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete post');
    }
  };

  const handleUpdate = (id) => navigate(`/update-post/${id}`);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-title">
          <PiSquaresFour size={24} />
          <h2>Dashboard</h2>
        </div>
        <div className="dashboard-actions">
          <Link to="/create-post" className="new-post-btn">+ New Post</Link>
          <Link to="/posts" className="view-blog-btn">
            <BiShow size={20} /> View Blog
          </Link>
        </div>
      </header>

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : (
        <div className="posts-container">
          {posts.length > 0 ? (
            <table className="post-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.author.username}</td>
                    <td>
                      <span className={`status ${post.published ? 'published' : 'draft'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="actions">
                        <Link to={`/posts/${post.id}`} className="view-btn" title="View">
                          <BiShow size={20} />
                        </Link>
                        <button onClick={() => handleUpdate(post.id)} className="edit-btn" title="Edit">
                          <BiEdit size={20} />
                        </button>
                        <button onClick={() => handleDelete(post.id)} className="delete-btn" title="Delete">
                          <BiTrash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-posts">No posts found.</div>
          )}
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Dashboard;

