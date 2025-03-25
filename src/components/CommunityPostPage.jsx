import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, Heart, Share2, Mountain, Camera, Compass, MapPin, PenTool, ChevronRight, X } from 'lucide-react';

const CommunityPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isWriting, setIsWriting] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    category: '',
    imageUrl: '',
    authorName: 'Travel Enthusiast', // Default author name
    authorAvatar: 'https://randomuser.me/api/portraits/lego/1.jpg' // Default avatar
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);

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
      const url = selectedCategory === 'all' 
        ? 'http://localhost:3000/community-post/allBlogs'
        : `http://localhost:3000/community-post/allBlogs?category=${selectedCategory}`;
      
      const response = await axios.get(url);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Preview the image
      setNewBlog({
        ...newBlog,
        imageUrl: URL.createObjectURL(file)
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', newBlog.title);
    formData.append('content', newBlog.content);
    formData.append('category', newBlog.category);
    formData.append('authorName', newBlog.authorName);
    formData.append('authorAvatar', newBlog.authorAvatar);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      await axios.post('http://localhost:3000/community-post/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setIsWriting(false);
      setNewBlog({
        title: '',
        content: '',
        category: '',
        imageUrl: '',
        authorName: 'Travel Enthusiast',
        authorAvatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
      });
      setSelectedFile(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const handleLike = async (blogId) => {
    try {
      await axios.post(`http://localhost:3000/community-post/${blogId}/like`);
      fetchBlogs();
    } catch (error) {
      console.error('Error liking blog:', error);
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
          >
            <PenTool className="mr-2" size={20} />
            Write a Blog
          </button>
        </div>
      </div>

      {/* Blog Writing Modal */}
      {isWriting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Write Your Blog</h2>
              <button 
                onClick={() => setIsWriting(false)} 
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
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
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
              >
                Publish Blog
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
              <h2 className="text-2xl font-semibold">Travel Stories</h2>
              <select 
                className="border rounded-lg px-4 py-2 text-gray-600 bg-white"
                onChange={(e) => console.log(e.target.value)} // Add sorting logic
              >
                <option>Most Recent</option>
                <option>Most Popular</option>
                <option>Most Discussed</option>
              </select>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No blogs found. Be the first to share your story!</p>
              </div>
            ) : (
              <div className="grid gap-10">
                {blogs.map(blog => (
                  <div key={blog._id} className="border-b pb-10 last:border-0">
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={blog.authorAvatar}
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
                    
                    {/* Enhanced Image Section */}
                    {blog.imageUrl && (
                      <div className="w-full h-80 mb-6 rounded-xl overflow-hidden shadow-md group">
                        <img
                          src={blog.imageUrl}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    
                    <p className="text-gray-600 mb-6">{blog.content.substring(0, 200)}...</p>
                    
                    <div className="flex items-center space-x-6 text-gray-500">
                      <button 
                        onClick={() => handleLike(blog._id)}
                        className="flex items-center space-x-1 hover:text-emerald-600"
                      >
                        <Heart size={18} className={blog.likes > 0 ? 'fill-current' : ''} />
                        <span>{blog.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-emerald-600">
                        <MessageSquare size={18} />
                        <span>{blog.comments}</span>
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