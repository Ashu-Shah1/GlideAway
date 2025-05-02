import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser, useAuth } from '@clerk/clerk-react';
import { 
  MessageSquare, Heart, Share2, Mountain, Camera, 
  Compass, MapPin, PenTool, ChevronRight, X 
} from 'lucide-react';

const CommunityPage = () => {
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isWriting, setIsWriting] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    category: '',
    imageUrl: '',
    authorName: isSignedIn ? `${user?.firstName} ${user?.lastName}` : 'Travel Enthusiast',
    authorAvatar: isSignedIn ? user?.profileImageUrl : 'https://randomuser.me/api/portraits/lego/1.jpg'
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState({});

  const travelCategories = [
    { id: 'char-dham', name: 'Char Dham Yatra', icon: <Mountain size={20} /> },
    { id: 'adventure', name: 'Adventure Sports', icon: <Compass size={20} /> },
    { id: 'photography', name: 'Photography Spots', icon: <Camera size={20} /> },
    { id: 'local-cuisine', name: 'Local Cuisine', icon: <MapPin size={20} /> }
  ];

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const url = `http://localhost:3000/community-post/allblogModels${selectedCategory !== 'all' ? `?category=${selectedCategory}` : ''}`;
      const response = await axios.get(url);
      setBlogs(Array.isArray(response?.data) ? response.data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs. Please try again later.');
      setBlogs([]);
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };

  const toggleExpandPost = (postId) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setNewBlog({
        ...newBlog,
        imageUrl: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isSignedIn) {
      setError('Please sign in to create a blog post');
      return;
    }

    const formData = new FormData();
    formData.append('title', newBlog.title);
    formData.append('content', newBlog.content);
    formData.append('category', newBlog.category);
    formData.append('authorName', `${user.firstName} ${user.lastName}`);
    formData.append('authorAvatar', user.profileImageUrl);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      setPublishing(true);
      const token = await getToken();
      await axios.post('http://localhost:3000/community-post/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      
      setIsWriting(false);
      setNewBlog({
        title: '',
        content: '',
        category: '',
        imageUrl: '',
        authorName: `${user.firstName} ${user.lastName}`,
        authorAvatar: user.profileImageUrl
      });
      setSelectedFile(null);
      await fetchBlogs();
    } catch (err) {
      console.error('Error creating blog:', err);
      setError(err.response?.data?.message || 'Error creating blog post');
    } finally {
      setPublishing(false);
    }
  };

  const handleLike = async (blogId) => {
    if (!isSignedIn) {
      setError('Please sign in to like posts');
      return;
    }

    try {
      // Optimistic update
      setBlogs(prevBlogs => 
        prevBlogs.map(blog => 
          blog._id === blogId 
            ? { 
                ...blog, 
                likes: blog.likes?.includes(user.id) 
                  ? blog.likes.filter(id => id !== user.id) 
                  : [...(blog.likes || []), user.id] 
              } 
            : blog
        )
      );

      const token = await getToken();
      await axios.post(`http://localhost:3000/community-post/${blogId}/like`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (err) {
      console.error('Error liking blog:', err);
      setError('Error updating like. Please try again.');
      fetchBlogs();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Share Your Uttarakhand Journey</h1>
          <p className="text-lg mb-6">Join our community of travelers exploring the beauty, spirituality, and adventure of Devbhoomi Uttarakhand.</p>
          <button 
            onClick={() => setIsWriting(true)}
            className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center"
            disabled={!isSignedIn}
          >
            <PenTool className="mr-2" size={20} />
            {isSignedIn ? 'Write a Blog' : 'Sign In to Write'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Blog Writing Modal */}
      {isWriting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Write Your Blog</h2>
              <button 
                onClick={() => {
                  setIsWriting(false);
                  setError(null);
                }} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newBlog.category}
                  onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="">Select a category</option>
                  {travelCategories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={newBlog.content}
                  onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[200px]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
                {newBlog.imageUrl && (
                  <div className="mt-4 w-full h-48 rounded-lg overflow-hidden">
                    <img 
                      src={newBlog.imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center"
                disabled={publishing}
              >
                {publishing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </>
                ) : (
                  'Publish Blog'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Side Categories */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Explore Categories</h2>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span>All Categories</span>
              </button>
              {travelCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {category.icon}
                    <span>{category.name}</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">
                {selectedCategory === 'all' ? 'All Travel Stories' : 
                 travelCategories.find(c => c.id === selectedCategory)?.name + ' Stories'}
              </h2>
              <select 
                className="border rounded-lg px-4 py-2 text-gray-600 bg-white"
                onChange={(e) => {
                  // Add sorting logic here if needed
                }}
              >
                <option>Most Recent</option>
                <option>Most Popular</option>
              </select>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
                  <p className="text-gray-600">Loading stories...</p>
                </div>
              </div>
            ) : hasFetched && blogs.length === 0 ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <img 
                    src="https://illustrations.popsy.co/gray/writing.svg" 
                    alt="No blogs" 
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">
                    {selectedCategory === 'all' 
                      ? 'No Blogs Yet' 
                      : `No ${travelCategories.find(c => c.id === selectedCategory)?.name} Stories`}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {selectedCategory === 'all'
                      ? 'Be the first to share your travel experience!'
                      : `No one has shared ${travelCategories.find(c => c.id === selectedCategory)?.name} stories yet.`}
                  </p>
                  <button
                    onClick={() => setIsWriting(true)}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center mx-auto"
                    disabled={!isSignedIn}
                  >
                    <PenTool className="mr-2" size={18} />
                    {isSignedIn ? 'Share Your Story' : 'Sign In to Write'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-10">
                {blogs.map(blog => (
                  <div key={blog._id} className="border-b pb-10 last:border-0">
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={blog.authorAvatar || 'https://randomuser.me/api/portraits/lego/1.jpg'}
                        alt={blog.authorName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{blog.authorName}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(blog.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <h2 className="text-xl font-semibold mb-3">{blog.title}</h2>
                    
                    {blog.imageUrl && (
                      <div className="w-full h-80 mb-6 rounded-xl overflow-hidden">
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                          style={{ objectFit: 'cover' }}
                          loading="lazy"
                        />
                      </div>
                    )}
                    
                    <div className="text-gray-600 mb-6 whitespace-pre-line">
                      {expandedPosts[blog._id] || blog.content.length <= 300 ? (
                        blog.content
                      ) : (
                        <>
                          {blog.content.substring(0, 300)}
                          <button 
                            onClick={() => toggleExpandPost(blog._id)}
                            className="text-emerald-600 hover:underline ml-1"
                          >
                            Read more
                          </button>
                        </>
                      )}
                      {expandedPosts[blog._id] && blog.content.length > 300 && (
                        <button 
                          onClick={() => toggleExpandPost(blog._id)}
                          className="text-emerald-600 hover:underline ml-1 block mt-2"
                        >
                          Show less
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-6 text-gray-500">
                      <button 
                        onClick={() => handleLike(blog._id)}
                        className="flex items-center space-x-1 hover:text-emerald-600"
                      >
                        <Heart 
                          size={18} 
                          className={blog.likes?.includes(user?.id) ? 'fill-current text-emerald-600' : ''} 
                        />
                        <span>{blog.likes?.length || 0}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-emerald-600">
                        <MessageSquare size={18} />
                        <span>{blog.comments || 0}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-emerald-600">
                        <Share2 size={18} />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;