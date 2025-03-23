import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, Heart, Share2, Trophy, MapPin, Mountain, Camera, Compass, PenTool, ChevronRight, X } from 'lucide-react';

const CommunityPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isWriting, setIsWriting] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    category: '',
    imageUrl: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const travelCategories = [
    {
      id: 'char-dham',
      name: 'Char Dham Yatra',
      icon: <Mountain size={20} />,
      count: 156
    },
    {
      id: 'adventure',
      name: 'Adventure Sports',
      icon: <Compass size={20} />,
      count: 89
    },
    {
      id: 'photography',
      name: 'Photography Spots',
      icon: <Camera size={20} />,
      count: 124
    },
    {
      id: 'local-cuisine',
      name: 'Local Cuisine',
      icon: <MapPin size={20} />,
      count: 78
    }
  ];

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', newBlog.title);
    formData.append('content', newBlog.content);
    formData.append('category', newBlog.category);
    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsWriting(false);
        setNewBlog({
          title: '',
          content: '',
          category: '',
          imageUrl: ''
        });
        setSelectedFile(null);
        fetchBlogs();
      }
    } catch (error) {
      console.error('Error creating blog:', error);
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
          <div className="flex space-x-4">
            <button 
              onClick={() => setIsWriting(true)}
              className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-colors flex items-center"
            >
              <PenTool className="mr-2" size={20} />
              Write a Blog
            </button>
          </div>
        </div>
      </div>

      {/* Blog Writing Modal */}
      {isWriting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Write Your Blog</h2>
              <button onClick={() => setIsWriting(false)} className="text-gray-500 hover:text-gray-700">
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
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 h-64"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors"
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
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{category.count}</span>
                    <ChevronRight size={16} className="ml-1" />
                  </div>
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
              <select className="border rounded-lg px-4 py-2 text-gray-600">
                <option>Most Recent</option>
                <option>Most Popular</option>
                <option>Most Discussed</option>
              </select>
            </div>
            <div className="grid gap-8">
              {blogs.map(blog => (
                <div key={blog._id} className="border-b pb-8 last:border-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={blog.authorAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80'}
                      alt={blog.authorName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{blog.authorName}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold mb-3">{blog.title}</h2>
                  {blog.imageUrl && (
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <p className="text-gray-600 mb-4">{blog.preview}</p>
                  <div className="flex items-center space-x-6 text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-emerald-600">
                      <Heart size={18} />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;