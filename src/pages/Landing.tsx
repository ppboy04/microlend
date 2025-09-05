
import React from 'react';
import { Link } from 'react-router-dom';
import {ArrowRight, Shield, Globe, TrendingUp, Users, Heart, CheckCircle} from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

const Landing: React.FC = () => {
  const { isDarkMode } = useStore();

  const features = [
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description: 'Advanced security measures and trust scoring system to protect all participants.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Connect with borrowers worldwide and make a real difference in their lives.'
    },
    {
      icon: TrendingUp,
      title: 'Fair Returns',
      description: 'Competitive interest rates that benefit both borrowers and lenders.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a community of like-minded individuals focused on financial inclusion.'
    }
  ];

  const stats = [
    { label: 'Active Borrowers', value: '10,000+' },
    { label: 'Total Funded', value: '$2.5M+' },
    { label: 'Success Rate', value: '94%' },
    { label: 'Countries', value: '25+' }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Hero title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className={`block ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Peer-to-Peer
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Micro-Lending,
              </span>
              <span className={`block ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Made Simple.
              </span>
            </h1>

            {/* Hero subtitle */}
            <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Connect borrowers and lenders directly. Build trust, create impact, and unlock financial opportunities for everyone.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/signup?role=borrower"
                className="group w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>I Want to Borrow</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/signup?role=lender"
                className={`group w-full sm:w-auto border-2 px-8 py-4 rounded-xl text-lg font-semibold transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 ${
                  isDarkMode 
                    ? 'border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900' 
                    : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                }`}
              >
                <span>I Want to Lend</span>
                <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Secure & Encrypted
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  94% Success Rate
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Global Community
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {stat.value}
                </div>
                <div className={`text-sm md:text-base ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Why Choose MicroLend?
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We're building a more inclusive financial ecosystem, one loan at a time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-xl border transition-all duration-200 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
              >
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className={`text-xl font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Get Started?
            </h2>
            <p className={`text-lg mb-8 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Join thousands of borrowers and lenders who are already making a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
              >
                Sign Up Today
              </Link>
              <Link
                to="/login"
                className={`border-2 px-8 py-3 rounded-lg text-lg font-semibold transform hover:scale-105 transition-all duration-200 ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Already have an account?
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
