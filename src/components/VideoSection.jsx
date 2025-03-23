import React from 'react';

const VideoSection = () => {
  return (
    <div className="mt-10 bg-black p-4 rounded-xl shadow-lg max-w-8xl mx-auto">
      <h2 className="text-xl font-semibold text-white mb-3 text-center">Explore More</h2>
      <video
        className="w-full h-80 rounded-lg object-cover"
        controls
        autoPlay
        muted
        loop
      >
        <source src="src/assets/UtVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoSection;
