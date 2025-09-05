import React from "react";
import {
  FaShieldAlt,
  FaUserShield,
  FaCookie,
  FaEnvelope,
} from "react-icons/fa";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

const Privacy: React.FC = () => {
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
              <FaShieldAlt className="text-black text-3xl" />
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Privacy <span className="text-[#f2f862]">Policy</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. This policy explains how Eventix
            360 collects, uses, and protects your personal information.
          </p>
          <div className="mt-6 text-sm text-gray-400">
            Last updated: January 2024
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <FaUserShield className="text-[#f2f862] text-2xl" />
              <h3 className="text-2xl font-bold">Information We Collect</h3>
            </div>
            <div className="space-y-4 text-gray-200">
              <p>We collect information you provide directly to us when you:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create an account with Eventix 360</li>
                <li>Register for events through our platform</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us for support or inquiries</li>
                <li>Participate in surveys or feedback forms</li>
              </ul>
              <p>
                This may include your name, email address, university
                information, and event preferences.
              </p>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6">
              How We Use Your Information
            </h3>
            <div className="space-y-4 text-gray-200">
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain our event discovery services</li>
                <li>Send you event notifications and updates</li>
                <li>Improve our platform and user experience</li>
                <li>Communicate with you about your account</li>
                <li>Analyze usage patterns to enhance our services</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <FaCookie className="text-[#f2f862] text-2xl" />
              <h3 className="text-2xl font-bold">Cookies and Tracking</h3>
            </div>
            <div className="space-y-4 text-gray-200">
              <p>We use cookies and similar tracking technologies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze how our website is used</li>
                <li>Provide personalized content and recommendations</li>
                <li>Improve our services and user experience</li>
              </ul>
              <p>
                You can control cookie settings through your browser
                preferences.
              </p>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6">Information Sharing</h3>
            <div className="space-y-4 text-gray-200">
              <p>
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information only in these
                limited circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  With event organizers when you register for their events
                </li>
                <li>With service providers who help us operate our platform</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6">Your Rights</h3>
            <div className="space-y-4 text-gray-200">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
                <li>Restrict how we process your information</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6">Data Security</h3>
            <div className="space-y-4 text-gray-200">
              <p>
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of sensitive data</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
                <li>Secure data storage and transmission</li>
              </ul>
            </div>
          </section>

          {/* Contact Section */}
          <div className="bg-white/5 p-8 rounded-2xl text-white text-center border border-white/10">
            <div className="flex justify-center mb-4">
              <FaEnvelope className="text-[#f2f862] text-2xl" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Questions About Privacy?
            </h3>
            <p className="text-gray-300 mb-6">
              If you have questions about this privacy policy or how we handle
              your data, please don&apos;t hesitate to contact us.
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

export default Privacy;
