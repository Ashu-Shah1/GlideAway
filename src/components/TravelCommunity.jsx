import React from 'react';
import { Users, MessageSquare, Heart } from 'lucide-react';

const TravelCommunity = () => {
  return (
    <section className="bg-gray-50 rounded-xl p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Join Our Travel Community</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect with fellow travelers, share your experiences, and discover hidden gems across Uttarakhand.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"
            alt="Blog post"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">A Week in the Valley of Flowers</h3>
            <p className="text-gray-600 mb-4">
              Exploring the beautiful Valley of Flowers during peak blooming season...
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>248 likes</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>42 comments</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1584732200355-486c00295ec9?auto=format&fit=crop&w=800&q=80"
            alt="Blog post"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Rafting Adventures in Rishikesh</h3>
            <p className="text-gray-600 mb-4">
              My thrilling experience white water rafting on the Ganges...
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>186 likes</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>28 comments</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1626714485831-c6dde7055612?auto=format&fit=crop&w=800&q=80"
            alt="Blog post"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">Hidden Temples of Kedarnath</h3>
            <p className="text-gray-600 mb-4">
              Discovering ancient temples and spiritual sites in the Himalayas...
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>324 likes</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>56 comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-12">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Join the Community
        </button>
      </div>
    </section>
  );
};

export default TravelCommunity;