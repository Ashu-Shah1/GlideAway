import React, { useState } from 'react';

const CommunityPostPage = () => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, like saving post data to your database
    console.log('Post submitted:', post);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPost({ ...post, image: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4">Share Your Experience</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="w-full p-3 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700">Content</label>
          <textarea
            id="content"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            className="w-full p-3 border rounded-md"
            rows="5"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 border rounded-md"
          />
        </div>
        {post.image && <img src={post.image} alt="Preview" className="w-full h-64 object-cover mb-4" />}
        <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg">
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default CommunityPostPage;
