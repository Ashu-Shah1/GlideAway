import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


const StateInfo = () => {
  const { district } = useParams();
  const [stateInfo, setStateInfo] = useState(null);
  const [loading, setIsLoading] = useState(true);

  // Fetch state info from the database
  useEffect(() => {
    async function fetchStateInfo() {
      try {
        const response = await axios.get(
          `http://localhost:3000/destination/${district}`
        );
        console.log(response.data);
        setStateInfo(response.data);
      } catch (error) {
        console.error("Error fetching destination info:", error);
      }
    }
    fetchStateInfo();
  }, [district]);

  // Preload images once stateInfo is available
  useEffect(() => {
    if (stateInfo && stateInfo.images) {
      const preloadImages = stateInfo.images.map((src) => {
        const img = new Image();
        img.src = src;
        return img;
      });

      // Check if all images are loaded
      Promise.all(
        preloadImages.map(
          (img) =>
            new Promise((resolve) => {
              img.onload = resolve;
            })
        )
      ).then(() => setIsLoading(false));
    }
  }, [stateInfo]); 


  if (!stateInfo || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <DotLottieReact
           src="https://lottie.host/bf75856a-65b5-46ff-adf9-cf5614a99fef/D06XLP2bvs.lottie"
           speed={2}
          loop
          autoplay
          style={{width: "200px",height: "200px",}}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">
          {stateInfo.districtName}
        </h1>
        <p className="text-lg text-gray-600">{stateInfo.info}</p>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Key Attractions</h2>
          <ul className="space-y-2">
            {stateInfo.keyAttractions.map((attraction) => (
              <li key={attraction} className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {attraction}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Local Culture</h2>
          <p className="text-gray-600">{stateInfo.localCulture}</p>
        </div>
      </div>

      <div className="space-y-6">
        <img
          src={stateInfo.images[1]}
          alt={stateInfo.state}
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Travel Tips</h2>
          <ul className="space-y-2 text-gray-600">
            <li>Best time to visit: March to June</li>
            <li>Carry warm clothes as temperatures can drop</li>
            <li>Respect local customs and traditions</li>
            <li>Book accommodations in advance during peak season</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StateInfo;
