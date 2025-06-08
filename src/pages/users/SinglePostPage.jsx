import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { BiSend, BiShare, BiCheck, BiArrowBack, BiTrash } from 'react-icons/bi';
import '../styles/singlePostPage.css';

const SinglePostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [shareSuccess, setShareSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPost(response.data);

        // Fetch comments for the post
        const commentsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/comments/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setComments(commentsResponse.data || []);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch post');
        if (err.response?.status === 401) {
          navigate('/loginPage');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, navigate]);

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };

  const handleAddComment = async () => {
    if (!commentContent.trim()) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/comments/add`,
        { 
          content: commentContent,
          postId: parseInt(postId) // Convert postId to integer since it comes from URL params
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Update comments array with the new comment
      const newComment = {
        ...response.data,
        username: localStorage.getItem('username'), // Add username to match comment display
        userId: localStorage.getItem('userId') // Add userId for delete functionality
      };
      
      setComments(prevComments => [...prevComments, newComment]);
      setCommentContent(''); // Clear input
    } catch (err) {
      console.error('Error adding comment:', err);
      setError(err.response?.data?.error || 'Failed to add comment');
    }
  };

  const handleBackToPosts = () => {
    navigate('/posts'); // Navigate back to the posts list
  };

  // Add share functionality
  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: `Check out this post: ${post.title}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  // Add handleDeleteComment function
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/comments/delete/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Update comments array after deletion
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete comment');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="single-post">
      <div className="post-header">
        <button className="back-to-posts" onClick={handleBackToPosts}>
          <BiArrowBack />
          <span>Back to Posts</span>
        </button>
      </div>

      <h1>{post.title}</h1>
      <div className="post-metadata">
        <span>By {post.author?.username}</span>
        <span>•</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      <div className="comment-section">
        <div className="comment-section-header">
          <h3>Comments</h3>
          <button className="share-button" onClick={handleShare}>
            {shareSuccess ? <BiCheck /> : <BiShare />}
          </button>
        </div>

        <div className="comment-input">
          <input
            type="text"
            value={commentContent}
            onChange={handleCommentChange}
            placeholder="Add your comment..."
          />
          <button
            onClick={handleAddComment}
            disabled={!commentContent.trim()}
            title="Add comment"
          >
            <BiSend size={20} />
          </button>
        </div>

        <div className="comments-list">
          {comments.map(comment => (
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
    </div>
  );
};

export default SinglePostPage;


