import React, { useEffect, useRef } from "react";
import {
  Map,
  Lock,
  Sun,
  MapPin,
  Phone,
  Mail,
  Mountain,
  Globe,
  Users,
  Calendar,
  Award,
  Hotel,
  CloudSun,
  ShieldCheck,
  WandSparkles,
  ChevronDown,
  Send,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

function AboutUs() {
  const teamSectionRef = useRef(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const scrollToTeam = () => {
    teamSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const teamMembers = [
    {
      name: "Gaurav Singh Negi",
      image: "/src/assets/TeamMembersImages/Gaurav.jpg",
    },
    {
      name: "Ashu Shah",
      image: "/src/assets/TeamMembersImages/Ashu Image.jpg",
    },
    {
      name: "Shrikesh Tiwari",
      image: "/src/assets/TeamMembersImages/shri.img.jpg",
    },
  ];

  const features = [
    {
      title: "Vibrant Travel Community",
      description:
        "Join our network of Himalayan explorers to share experiences, get insider tips, and find travel companions for your next adventure.",
      icon: <Users className="w-8 h-8" />,
      stats: "10,000+ active members",
    },
    {
      title: "Curated Accommodations",
      description:
        "From luxury mountain resorts to authentic village homestays, we personally verify every property to ensure quality and value.",
      icon: <Hotel className="w-8 h-8" />,
      stats: "500+ verified stays",
    },
    {
      title: "Diverse Himalayan Experiences",
      description:
        "Choose from 50+ activities including trekking, yoga retreats, wildlife safaris, and cultural immersions across Uttarakhand.",
      icon: <Mountain className="w-8 h-8" />,
      stats: "200+ local guides",
    },
    {
      title: "Live Weather Updates",
      description:
        "Plan smarter with real-time weather forecasts for your destination, so you're always ready for the Himalayas' mood swings.",
      icon: <CloudSun className="w-8 h-8" />, // import from lucide-react
      stats: "Updated hourly",
    },
    {
      title: "Secure User Authentication",
      description:
        "Your data is protected with end-to-end encryption and secure login systems, including email, OTP, and social login support.",
      icon: <ShieldCheck className="w-8 h-8" />,
      stats: "100% data privacy",
    },
    {
      title: "Unique Local Activities",
      description:
        "Engage in cultural experiences like village cooking classes, local farming, eco-volunteering, and temple trails designed by locals.",
      icon: <WandSparkles className="w-8 h-8" />,
      stats: "50+ immersive tours",
    },
  ];

  const teamPhilosophy = [
    {
      title: "Collaborative Planning",
      description: "Weekly cross-team syncs ensure perfect trip balance",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      title: "Local Partnerships",
      description: "Jointly developed relationships for authentic experiences",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      title: "Traveler-Centric",
      description: "All decisions prioritize the traveler experience",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section with rounded border */}
      <div className="relative bg-gradient-to-br from-blue-900 to-black pt-16 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/src/assets/front-image.jpg"
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 relative z-10"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Discover <span className="text-blue-300">Uttarakhand</span> With
                Us
              </h1>
              <p className="text-blue-100 text-xl mb-8">
                Where expert teamwork creates unforgettable Himalayan journeys
              </p>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg"
                >
                  Explore Tours
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToTeam}
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:bg-opacity-10 transition-colors shadow-lg"
                >
                  Meet Our Team
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="hidden md:block relative"
            >
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="relative">
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  src="/src/assets/lord shiva.jpg"
                  alt="Uttarakhand Landscape"
                  className="rounded-2xl shadow-2xl border-4 border-white"
                  style={{ borderRadius: "20px" }} // Added border radius
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg"
                >
                  <div className="flex items-center">
                    <Mountain className="w-6 h-6 text-blue-700 mr-2" />
                    <span className="font-bold">Team Verified</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Key Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive travel solutions designed to make your Himalayan
              adventure seamless and memorable
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-16"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border-t-4 border-blue-600 group"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <p className="text-sm text-blue-600 font-medium">
                  {feature.stats}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-blue-50 rounded-2xl p-8 md:p-12 mb-16"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Why Choose Us?
                </h3>
                <p className="text-gray-700 mb-6">
                  We combine local knowledge with essential digital tools to
                  make your Uttarakhand trip easier, smarter, and more
                  immersive. Whether you're planning a solo adventure or a
                  family vacation, our platform gives you everything in one
                  place.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <Map className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        All-in-One Travel Info
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Get destination details, routes, weather, stays, and
                        activities—everything you need to plan a trip.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <Lock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Secure & Private
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Your login, preferences, and data are protected with
                        industry-standard security measures.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <Sun className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Live Weather Integration
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Real-time weather updates for smarter day-by-day travel
                        planning.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden">
                <img
                  src="/src/assets/phone-pic.jpg"
                  alt="Himalayan Experience"
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Team Section with ref */}
      <div ref={teamSectionRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Expert Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A dedicated group of members passionate about creating exceptional
              Himalayan experiences
            </p>
          </motion.div>

          {/* Team Members - Simplified */}
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <h3 className="text-xl font-bold text-white">
                      {member.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Comprehensive Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for a perfect Himalayan getaway
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1932"
                    alt="Community"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <Users className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-800">
                  Travel Community
                </h3>
                <p className="text-gray-600 mb-4">
                  Connect with fellow travelers, share experiences, and get
                  insider tips.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Forum discussions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Meetup groups
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Experience sharing
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070"
                    alt="Hotels"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <Hotel className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-800">
                  Accommodation Network
                </h3>
                <p className="text-gray-600 mb-4">
                  Carefully selected stays ranging from luxury resorts to
                  authentic homestays.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Verified reviews
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Best price guarantee
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Local hospitality
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <img
                    src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&q=80&w=2076"
                    alt="Activities"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <Mountain className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-800">
                  Activities & Experiences
                </h3>
                <p className="text-gray-600 mb-4">
                  Curated adventures and cultural experiences for all types of
                  travelers.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Trekking expeditions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Cultural immersions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Seasonal activities
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="py-20 bg-gradient-to-br from-blue-900 to-black text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
              <p className="text-xl text-blue-100 mb-8">
                Have questions about our services or need travel advice? Our
                team is here to help.
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-blue-500 bg-opacity-20 p-3 rounded-full mr-4">
                    <Mail className="w-6 h-6 text-blue-300" />
                  </div>
                  <p>
                    iamashu.shah12@gmail.com
                    <br />
                    gauravsinghnegi54@gmail.com
                    <br />
                    tiwarishrikesh96@gmail.com
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20"
            >
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 focus:outline-none focus:border-blue-300 placeholder-white placeholder-opacity-70 text-white"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 focus:outline-none focus:border-blue-300 placeholder-white placeholder-opacity-70 text-white"
                  />
                </div>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 focus:outline-none focus:border-blue-300 text-white appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23bfdbfe' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.75rem center",
                      backgroundSize: "1.25rem",
                    }}
                  >
                    <option value="" className="bg-blue-900 text-white">
                      Regarding...
                    </option>
                    <option
                      value="project-feedback"
                      className="bg-blue-900 text-white hover:bg-blue-800"
                    >
                      Project Feedback
                    </option>
                    <option
                      value="collaboration"
                      className="bg-blue-900 text-white hover:bg-blue-800"
                    >
                      Collaboration Opportunity
                    </option>
                    <option
                      value="technical-question"
                      className="bg-blue-900 text-white hover:bg-blue-800"
                    >
                      Technical Question
                    </option>
                    <option
                      value="other"
                      className="bg-blue-900 text-white hover:bg-blue-800"
                    >
                      Other Inquiry
                    </option>
                  </select>
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 focus:outline-none focus:border-blue-300 placeholder-white placeholder-opacity-70 text-white"
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg w-full"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AboutUs;
