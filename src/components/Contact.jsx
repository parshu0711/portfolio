import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Initialize EmailJS (replace with your public key)
  React.useEffect(() => {
    emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Simulate sending email (replace with actual EmailJS when credentials are added)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', mobile: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 5000);
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] relative z-10">
      <div className="w-full max-w-7xl mx-auto px-6">
        
        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >
          <h1 className="text-6xl md:text-7xl font-light text-white mb-6">
            Get In <span className="text-[#c9a961]">Touch</span>
          </h1>
          <div className="w-32 h-1 bg-[#c9a961]"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE - VIDEO */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative rounded-2xl overflow-hidden shadow-2xl h-full min-h-[350px]"
          >
            <video
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
              src="https://ik.imagekit.io/vzxwc5boa/Black_Background_Video_Generation.mp4"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </motion.div>

          {/* RIGHT SIDE - FORM */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="bg-[#0f0f0f] rounded-2xl p-6 border border-gray-800/50">
              <h2 className="text-3xl font-light text-white mb-2">Let's Work Together</h2>
              <p className="text-gray-400 text-sm mb-6 font-light">Fill in the details and I'll get back to you within 24 hours.</p>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Success/Error Message */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg text-center ${
                      submitStatus === 'success'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : 'bg-red-500/20 text-red-400 border border-red-500/50'
                    }`}
                  >
                    {submitStatus === 'success'
                      ? '✓ Message sent successfully! I\'ll reply within 24 hours.'
                      : '✗ Failed to send message. Please try again.'}
                  </motion.div>
                )}

                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#1a1a1a] border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961]/20 transition-all duration-300"
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#1a1a1a] border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961]/20 transition-all duration-300"
                  />
                </motion.div>

                {/* Mobile Number */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <input 
                    type="tel" 
                    name="mobile"
                    placeholder="Mobile Number" 
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full bg-[#1a1a1a] border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961]/20 transition-all duration-300"
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <textarea 
                    name="message"
                    rows="3" 
                    placeholder="Your message..." 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#1a1a1a] border border-gray-700/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c9a961] focus:ring-1 focus:ring-[#c9a961]/20 transition-all duration-300 resize-none"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div 
                  className="pt-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <motion.button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#c9a961] text-[#0a0a0a] font-semibold rounded-lg hover:bg-[#d4b877] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!isSubmitting ? { y: -2, boxShadow: "0 10px 25px rgba(201, 169, 97, 0.3)" } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </motion.div>
              </form>

              {/* CONTACT METHODS */}
              <motion.div 
                className="mt-12 pt-8 border-t border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-6 font-light">Or reach me directly on</p>
                <div className="flex items-center gap-6">
                  {/* GitHub */}
                  <motion.a
                    href="https://github.com/parshu0711"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#1a1a1a] border border-gray-700/50 rounded-lg flex items-center justify-center text-white hover:bg-[#c9a961] hover:border-[#c9a961] transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </motion.a>

                  {/* LinkedIn */}
                  <motion.a
                    href="https://www.linkedin.com/in/prashantmete07/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-[#1a1a1a] border border-gray-700/50 rounded-lg flex items-center justify-center text-white hover:bg-[#0a66c2] hover:border-[#0a66c2] transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                    </svg>
                  </motion.a>

                  {/* Email */}
                  <motion.button
                    onClick={() => {
                      window.open("mailto:prashantmete0711@gmail.com");
                    }}
                    className="w-12 h-12 bg-[#1a1a1a] border border-gray-700/50 rounded-lg flex items-center justify-center text-white hover:bg-[#c9a961] hover:border-[#c9a961] transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;