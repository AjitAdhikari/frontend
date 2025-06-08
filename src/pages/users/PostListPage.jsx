import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiComment, BiShare, BiCheck, BiSend, BiTrash } from 'react-icons/bi';
import { AiOutlineEye} from 'react-icons/ai';
import '../../pages/styles/allPosts.css';

const PostsListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentContent, setCommentContent] = useState({});
  const [comments, setComments] = useState({});
  const [visibleComments, setVisibleComments] = useState({});
  const [shareSuccess, setShareSuccess] = useState({}); // Add this for share feedback
  const navigate = useNavigate();

  const handleViewPost = (postId) => {
    navigate(`/posts/${postId}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const userRole = localStorage.getItem('role');
        const filteredPosts = userRole === 'ADMIN' ? response.data : response.data.filter(post => post.published);
        setPosts(filteredPosts);

        // Move comments fetching to toggleComments function
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch posts');
        if (err.response?.status === 401) {
          navigate('/loginPage');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [navigate]);

  const toggleComments = async (postId) => {
    setVisibleComments(prev => {
      const newState = {
        ...prev,
        [postId]: !prev[postId]
      };

      // Fetch comments if we're opening the section and don't have comments yet
      if (newState[postId] && (!comments[postId] || comments[postId].length === 0)) {
        fetchComments(postId);
      }

      return newState;
    });
  };

  // Update fetchComments to use the correct endpoint
  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/comments/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setComments(prev => ({
        ...prev,
        [postId]: response.data
      }));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch comments');
    }
  };

  // Update handleAddComment to use the correct endpoint
  const handleAddComment = async (postId) => {
    if (!commentContent[postId]?.trim()) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/comments/add`,
        { 
          content: commentContent[postId],
          postId: postId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), response.data]
      }));

      setCommentContent(prev => ({
        ...prev,
        [postId]: ''
      }));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add comment');
    }
  };

  // Add share functionality
  const handleShare = async (post) => {
    const shareData = {
      title: post.title,
      text: `Check out this post: ${post.title}`,
      url: `${window.location.origin}/posts/${post.id}`
    };

    try {
      if (navigator.share) {
        // Use Web Share API if available
        await navigator.share(shareData);
      } else {
        // Fallback to copying link to clipboard
        await navigator.clipboard.writeText(shareData.url);
        setShareSuccess(prev => ({
          ...prev,
          [post.id]: true
        }));
        setTimeout(() => {
          setShareSuccess(prev => ({
            ...prev,
            [post.id]: false
          }));
        }, 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  // Add handleDeleteComment function
  const handleDeleteComment = async (postId, commentId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/comments/delete/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Update comments state after successful deletion
      setComments(prev => ({
        ...prev,
        [postId]: prev[postId].filter(comment => comment.id !== commentId)
      }));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete comment');
    }
  };

  return (
    <div className='all-posts'>
      <div className='all-posts-header'>
        <h1>Trending Stories</h1>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="post-cards">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              
              <h2 className="post-title">{post.title}</h2>
              <div className="post-meta">
                <div className="author-info">
                  <span className="author-name"> By: {post.author.username}</span>
                  <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="post-excerpt">{post.content.slice(0, 100)}...</p>
            </div>
            
            <div className="post-footer">
              <div className="post-stats">
                <button 
                  className="stat-btn"
                  onClick={() => handleViewPost(post.id)}
                  title="View post"
                >
                  <AiOutlineEye />
                </button>
                <button 
                  className="stat-btn"
                  onClick={() => toggleComments(post.id)}
                  title="Show comments"
                >
                  <BiComment />
                  <span>{comments[post.id]?.length || 0}</span>
                </button>
                <button 
                  className="stat-btn"
                  onClick={() => handleShare(post)}
                >
                  {shareSuccess[post.id] ? <BiCheck /> : <BiShare />}
                </button>
              </div>
            </div>

            {/* Add the comment section here */}
            {visibleComments[post.id] && (
              <div className="comment-section">
                <div className="comment-input-group">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentContent[post.id] || ''}
                    onChange={(e) => setCommentContent({
                      ...commentContent,
                      [post.id]: e.target.value
                    })}
                  />
                  <button 
                    onClick={() => handleAddComment(post.id)}
                    disabled={!commentContent[post.id]?.trim()}
                    title="Post comment"
                  >
                    <BiSend size={20} />
                  </button>
                </div>
                
                <div className="comments-list">
                  {comments[post.id]?.map((comment) => (
                    <div key={comment.id} className="comment">
                      <div className="comment-content-wrapper">
                        <span className="comment-author">{comment.username}</span>
                        <p className="comment-content">{comment.content}</p>
                      </div>
                      {(localStorage.getItem('userId') === comment.userId || 
                        localStorage.getItem('role') === 'AUTHOR') && (
                        <button 
                          className="delete-comment-btn"
                          onClick={() => handleDeleteComment(comment.id)}
                          title="Delete comment"
                        >
                          <BiTrash />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsListPage;
