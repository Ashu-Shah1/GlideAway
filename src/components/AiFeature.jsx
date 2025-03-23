import React from "react";
import { motion } from "framer-motion";
import { Brain, Calendar, Map, Sparkles } from "lucide-react";

const AiFeature = () => {
  return (
    <section className="bg-white">
      {/* Hero AI Section */}
      <div className="relative mb-0">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1675351066828-6fc770b90dd2"
                  alt="AI Travel Planning"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-center space-x-2 text-white">
                    <Sparkles className="text-yellow-400" />
                    <span className="text-sm font-medium">
                      AI Processing Your Preferences
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: "75%" }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="h-full bg-gradient-to-r from-emerald-400 to-blue-400"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:pl-8"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Experience Travel Planning, {" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">
                  Reimagined with AI
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our advanced AI system analyzes thousands of data points to
                create your perfect Uttarakhand journey, considering weather
                patterns, local events, and your personal preferences.
              </p>
              <div className="space-y-4">
                {aiFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const aiFeatures = [
  {
    icon: <Brain className="text-emerald-600" size={24} />,
    title: "Intelligent Recommendations",
    description:
      "Our AI analyzes your preferences and travel history to suggest perfect destinations.",
  },
  {
    icon: <Calendar className="text-emerald-600" size={24} />,
    title: "Smart Scheduling",
    description:
      "Optimal visit timing based on weather patterns and local festivals.",
  },
  {
    icon: <Map className="text-emerald-600" size={24} />,
    title: "Dynamic Routing",
    description:
      "Real-time route optimization considering weather and crowd conditions.",
  },
];

export default AiFeature;
