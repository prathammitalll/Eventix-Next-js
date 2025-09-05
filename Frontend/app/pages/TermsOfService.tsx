"use client"
import React from "react";
import { FaGavel, FaShieldAlt, FaUserLock } from "react-icons/fa";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

const TermsOfService: React.FC = () => {
  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#f2f862] rounded-full flex items-center justify-center shadow-lg">
              <FaGavel className="text-black text-3xl" />
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Terms of <span className="text-[#f2f862]">Service</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Please read these terms and conditions carefully before using Eventix 360.
          </p>
          <div className="mt-6 text-sm text-gray-400">
            Last updated: January 2024
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <FaShieldAlt className="text-[#f2f862] text-2xl" />
              <h3 className="text-2xl font-bold">Agreement to Terms</h3>
            </div>
            <div className="space-y-4 text-gray-200">
              <p>
                By accessing or using Eventix 360, you agree to be bound by these Terms
                of Service and all applicable laws and regulations. If you do not agree
                with any of these terms, you are prohibited from using this platform.
              </p>
              <p>
                We reserve the right to modify these terms at any time. Your continued
                use of the platform following the posting of changes constitutes your
                acceptance of such changes.
              </p>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6">User Responsibilities</h3>
            <div className="space-y-4 text-gray-200">
              <p>As a user of Eventix 360, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Follow all applicable laws and regulations</li>
                <li>Respect the rights of other users</li>
                <li>Not misuse or abuse the platform&apos;s features</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <FaUserLock className="text-[#f2f862] text-2xl" />
              <h3 className="text-2xl font-bold">Account Terms</h3>
            </div>
            <div className="space-y-4 text-gray-200">
              <p>When creating an account on Eventix 360:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must be at least 18 years old</li>
                <li>You are responsible for all activities under your account</li>
                <li>You must notify us of any security breaches</li>
                <li>We reserve the right to terminate accounts</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6">Event Registration</h3>
            <div className="space-y-4 text-gray-200">
              <p>When registering for events through our platform:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All registrations are subject to availability</li>
                <li>Payment terms are set by individual event organizers</li>
                <li>Cancellation policies vary by event</li>
                <li>We are not responsible for event quality or safety</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6">Limitation of Liability</h3>
            <div className="space-y-4 text-gray-200">
              <p>
                Eventix 360 and its administrators, officers, employees, and agents
                shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use or inability to use the service</li>
                <li>Unauthorized access to your data</li>
                <li>Statements or conduct of third parties</li>
                <li>Technical issues or interruptions</li>
              </ul>
            </div>
          </section>

          {/* Contact Section */}
          <div className="bg-white/5 p-8 rounded-2xl text-center border border-white/10">
            <h3 className="text-2xl font-bold mb-4">Questions About Terms?</h3>
            <p className="text-gray-300 mb-6">
              If you have any questions about these Terms of Service, please contact us.
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#f2f862] text-black px-8 py-3 rounded-lg font-semibold hover:bg-[#e8e356] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center mt-16">
          <button
            onClick={scrollToTop}
            className="text-[#f2f862] hover:text-[#e8e356] font-medium transition-colors"
          >
            Back to Top ↑
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;
