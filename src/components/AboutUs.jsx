import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
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
  BookText,
} from "lucide-react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

function AboutUs() {
  const teamSectionRef = useRef(null);
  const contactSectionRef = useRef(null);
  const formRef = useRef(null);
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (location.hash === '#contact') {
      setTimeout(() => {
        contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location]);

  const scrollToTeam = () => {
    teamSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const templateParams = {
      team_emails: 'iamashu.shah12@gmail.com,gauravsinghnegi54@gmail.com,tiwarishrikesh96@gmail.com',
      user_name: e.target.user_name.value,
      user_email: e.target.user_email.value,
      subject: e.target.subject.value,
      message: `
From: ${e.target.user_name.value} <${e.target.user_email.value}>
Subject: ${e.target.subject.value}

${e.target.message.value}

---
Sent via Uttarakhand Travel Guide contact form
      `,
    };

    try {
      await emailjs.send(
        'service_2sbecoc', 
        'your_template_id', 
        templateParams,
        'your_public_key' 
      );
      setSubmitSuccess(true);
      formRef.current.reset();
    } catch (error) {
      console.error('Failed to send:', error);
      alert('Message failed to send. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
      title: "Travel Community & Blogs",
      description: "Read inspiring travel stories from fellow Himalayan explorers or write your own to share experiences, itineraries, and hidden gems.",
      icon: <BookText className="w-8 h-8" />,
    },
    {
      title: "District-wise Cultural & Weather Insights",
      description: "Dive into detailed information about each district in Uttarakhand, including cultural heritage, local cuisine, and real-time weather updates.",
      icon: <CloudSun className="w-8 h-8" />,
    },
    {
      title: "Categorized Activities",
      description: "Explore Uttarakhand through our curated activity categories: thrilling Trekking routes, peaceful Spiritual tours, and high-octane Adventure sports.",
      icon: <Mountain className="w-8 h-8" />,
    },
    {
      title: "Verified Hotel Listings",
      description: "Discover and book from a range of accommodations — from cozy village stays to luxurious mountain resorts — using real-time Booking.com data.",
      icon: <Hotel className="w-8 h-8" />,
    },
    {
      title: "Secure Authentication",
      description: "Enjoy peace of mind with end-to-end encrypted logins powered by Clerk, supporting email, OTP, and social logins for safe and easy access.",
      icon: <ShieldCheck className="w-8 h-8" />,
    },
    {
      title: "Interactive Map Navigation",
      description: "Visualize your journey with our dynamic map interface, helping you discover routes, points of interest, and plan trips effortlessly.",
      icon: <Map className="w-8 h-8" />,
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
      {/* Hero Section */}
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
                Discover <span className="text-blue-300">Uttarakhand</span> With Us
              </h1>
              <p className="text-blue-100 text-xl mb-8">
                Where expert teamwork creates unforgettable Himalayan journeys
              </p>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "whitesmoke",
                    color: "black",
                  }}
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
                  style={{ borderRadius: "20px" }}
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

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
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
              </motion.div>
            ))}
          </motion.div>

          {/* Why Choose Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-blue-50 rounded-2xl p-8 md:p-12 mb-16"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Why Choose Us?</h3>
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
                      <h4 className="font-semibold text-gray-800">All-in-One Travel Info</h4>
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
                      <h4 className="font-semibold text-gray-800">Secure & Private</h4>
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
                      <h4 className="font-semibold text-gray-800">Live Weather Integration</h4>
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

      {/* Team Section */}
      <div ref={teamSectionRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Expert Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A dedicated group of members passionate about creating exceptional
              Himalayan experiences
            </p>
          </motion.div>

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
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div ref={contactSectionRef} id="contact">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 my-20 bg-gradient-to-br from-blue-900 to-black text-white rounded-sm"
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
                    <div>
                      <p>iamashu.shah12@gmail.com</p>
                      <p>gauravsinghnegi54@gmail.com</p>
                      <p>tiwarishrikesh96@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-500 bg-opacity-20 p-3 rounded-full mr-4">
                      <Phone className="w-6 h-6 text-blue-300" />
                    </div>
                    <div>
                      <div className="flex items-baseline">
                        <span className="mr-2">+91 9557928562</span>
                        <span className="text-sm text-blue-200">(Gaurav)</span>
                      </div>
                      <div className="flex items-baseline">
                        <span className="mr-2">+91 9760129409</span>
                        <span className="text-sm text-blue-200">(Shrikesh Tiwari)</span>
                      </div>
                    </div>
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
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="user_name"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 focus:outline-none focus:border-blue-300 placeholder-white placeholder-opacity-70 text-white"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="user_email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 focus:outline-none focus:border-blue-300 placeholder-white placeholder-opacity-70 text-white"
                      required
                    />
                  </div>
                  <div className="relative">
                    <select
                      name="subject"
                      className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 focus:outline-none focus:border-blue-300 text-white appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23bfdbfe' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",
                        backgroundSize: "1.25rem",
                      }}
                      required
                    >
                      <option value="" className="bg-blue-900 text-white">Regarding...</option>
                      <option value="Project Feedback" className="bg-blue-900 text-white hover:bg-blue-800">Project Feedback</option>
                      <option value="Collaboration Opportunity" className="bg-blue-900 text-white hover:bg-blue-800">Collaboration Opportunity</option>
                      <option value="Technical Question" className="bg-blue-900 text-white hover:bg-blue-800">Technical Question</option>
                      <option value="Other Inquiry" className="bg-blue-900 text-white hover:bg-blue-800">Other Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 focus:outline-none focus:border-blue-300 placeholder-white placeholder-opacity-70 text-white"
                      required
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg w-full flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-green-500 bg-opacity-20 text-green-300 rounded-lg flex items-center"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Message sent successfully! We'll get back to you soon.
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AboutUs;