import React from "react";
import { motion } from "framer-motion";
import {
  FaGavel,
  FaExclamationTriangle,
  FaUsers,
  FaEnvelope,
} from "react-icons/fa";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

const TermsOfService = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        {/* Page Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#f2f862] rounded-full flex items-center justify-center shadow-lg">
              <FaGavel className="text-black text-3xl" />
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Terms of <span className="text-[#f2f862]">Service</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using Eventix 360. By
            accessing our platform, you agree to be bound by these terms.
          </p>
          <div className="mt-6 text-sm text-gray-400">
            Last updated: January 2024
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-12">
          <motion.section
            className="bg-white/5 p-8 rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Acceptance of Terms</h3>
            <div className="space-y-4 text-gray-200">
              <p>
                By accessing and using Eventix 360, you accept and agree to be
                bound by the terms and provision of this agreement. If you do
                not agree to abide by the above, please do not use this service.
              </p>
              <p>
                These terms apply to all visitors, users, and others who access
                or use the service.
              </p>
            </div>
          </motion.section>

          <motion.section
            className="bg-white/5 p-8 rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <FaUsers className="text-[#f2f862] text-2xl" />
              <h3 className="text-2xl font-bold">User Accounts</h3>
            </div>
            <div className="space-y-4 text-gray-200">
              <p>
                When you create an account with us, you must provide information
                that is accurate, complete, and current at all times.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You are responsible for safeguarding your account password
                </li>
                <li>You must not share your account credentials with others</li>
                <li>
                  You must notify us immediately of any unauthorized use of your
                  account
                </li>
                <li>
                  We reserve the right to terminate accounts that violate our
                  terms
                </li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            className="bg-white/5 p-8 rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-6">Acceptable Use</h3>
            <div className="space-y-4 text-gray-200">
              <p>
                You may use our service for lawful purposes only. You agree not
                to use the service:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>In any way that violates applicable laws or regulations</li>
                <li>
                  To post false, misleading, or fraudulent event information
                </li>
                <li>To harass, abuse, or harm other users</li>
                <li>To distribute spam or unsolicited content</li>
                <li>To attempt to gain unauthorized access to our systems</li>
                <li>To interfere with the proper functioning of the service</li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            className="bg-white/5 p-8 rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6">
              Event Listings and Registration
            </h3>
            <div className="space-y-4 text-gray-200">
              <p>
                Eventix 360 serves as a platform to discover and register for
                campus events:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Event information is provided by event organizers and clubs
                </li>
                <li>
                  We are not responsible for the accuracy of event details
                </li>
                <li>
                  Event cancellations or changes are managed by organizers
                </li>
                <li>
                  Registration policies are set by individual event organizers
                </li>
                <li>
                  We facilitate connections but are not liable for event
                  outcomes
                </li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            className="bg-white/5 p-8 rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-6">Intellectual Property</h3>
            <div className="space-y-4 text-gray-200">
              <p>
                The service and its original content, features, and
                functionality are owned by Eventix 360 and are protected by:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>International copyright laws</li>
                <li>Trademark laws</li>
                <li>Other applicable intellectual property rights</li>
              </ul>
              <p>
                You may not reproduce, distribute, or create derivative works
                without our written permission.
              </p>
            </div>
          </motion.section>

          <motion.section
            className="bg-white/5 p-8 rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <FaExclamationTriangle className="text-[#f2f862] text-2xl" />
              <h3 className="text-2xl font-bold">
                Disclaimers and Limitations
              </h3>
            </div>
            <div className="space-y-4 text-gray-200">
              <p>
                The information on this website is provided on an "as is" basis:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  We make no warranties about the completeness or accuracy of
                  event information
                </li>
                <li>
                  We are not liable for any losses arising from use of our
                  service
                </li>
                <li>
                  Event organizers are solely responsible for their events
                </li>
                <li>
                  We reserve the right to modify or discontinue the service
                </li>
              </ul>
            </div>
          </motion.section>

          <motion.section
            className="bg-white/5 p-8 rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-6">Termination</h3>
            <div className="space-y-4 text-gray-200">
              <p>
                We may terminate or suspend your account and access to the
                service:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>For violations of these terms</li>
                <li>For suspected fraudulent or illegal activity</li>
                <li>At our sole discretion without prior notice</li>
              </ul>
              <p>
                Upon termination, your right to use the service will cease
                immediately.
              </p>
            </div>
          </motion.section>

          <motion.section
            className="bg-white/5 p-8 rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <h3 className="text-2xl font-bold mb-6">Changes to Terms</h3>
            <div className="space-y-4 text-gray-200">
              <p>
                We reserve the right to modify or replace these terms at any
                time:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Material changes will be posted on this page</li>
                <li>Changes become effective immediately upon posting</li>
                <li>Continued use constitutes acceptance of new terms</li>
              </ul>
            </div>
          </motion.section>

          {/* Contact Section */}
          <motion.div
            className="bg-white/5 p-8 rounded-2xl text-white text-center border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="flex justify-center mb-4">
              <FaEnvelope className="text-[#f2f862] text-2xl" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Questions About These Terms?
            </h3>
            <p className="text-gray-300 mb-6">
              If you have any questions about these Terms of Service, please
              contact us for clarification.
            </p>
            <motion.a
              href="/contact"
              className="inline-block bg-[#f2f862] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#e8e356] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>

        {/* Back to Top */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            onClick={scrollToTop}
            className="text-[#f2f862] hover:text-[#e8e356] font-medium transition-colors"
            whileHover={{ y: -2 }}
          >
            Back to Top ↑
          </motion.button>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;
