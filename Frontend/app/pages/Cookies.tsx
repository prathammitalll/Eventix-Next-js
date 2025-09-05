import React from "react";
import { FaCookie, FaCog, FaChartLine, FaEnvelope } from "react-icons/fa";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";

const Cookies: React.FC = () => {
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
              <FaCookie className="text-black text-3xl" />
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Cookie <span className="text-[#f2f862]">Policy</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            This policy explains how Eventix 360 uses cookies and similar
            technologies to recognize you when you visit our platform.
          </p>
          <div className="mt-6 text-sm text-gray-400">
            Last updated: January 2024
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6">What Are Cookies?</h3>
            <div className="space-y-4 text-gray-200">
              <p>
                Cookies are small data files that are placed on your computer or
                mobile device when you visit a website. Cookies are widely used
                by website owners to make their websites work more efficiently
                and to provide reporting information.
              </p>
              <p>
                Cookies set by the website owner (in this case, Eventix 360) are
                called &quot;first party cookies&quot;. Cookies set by parties other than
                the website owner are called &quot;third party cookies&quot;.
              </p>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <FaCog className="text-[#f2f862] text-2xl" />
              <h3 className="text-2xl font-bold">Essential Cookies</h3>
            </div>
            <div className="space-y-4 text-gray-200">
              <p>
                These cookies are strictly necessary to provide you with
                services available through our platform:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Authentication cookies:</strong> Keep you logged in to
                  your account
                </li>
                <li>
                  <strong>Security cookies:</strong> Protect against cross-site
                  request forgery
                </li>
                <li>
                  <strong>Load balancing cookies:</strong> Ensure website
                  functionality
                </li>
                <li>
                  <strong>User interface cookies:</strong> Remember your
                  preferences and settings
                </li>
              </ul>
              <p className="text-sm bg-[#f2f862]/10 p-4 rounded-lg border-l-4 border-[#f2f862] text-[#f2f862]">
                <strong>Note:</strong> These cookies cannot be disabled as they
                are essential for the platform to function properly.
              </p>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-6">
              <FaChartLine className="text-[#f2f862] text-2xl" />
              <h3 className="text-2xl font-bold">Analytics Cookies</h3>
            </div>
            <div className="space-y-4 text-gray-200">
              <p>
                These cookies help us understand how visitors interact with our
                platform:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Google Analytics:</strong> Tracks website usage and
                  user behavior
                </li>
                <li>
                  <strong>Performance cookies:</strong> Monitor page load times
                  and errors
                </li>
                <li>
                  <strong>Heatmap cookies:</strong> Understand how users
                  navigate our pages
                </li>
                <li>
                  <strong>A/B testing cookies:</strong> Help us test different
                  features
                </li>
              </ul>
              <p>
                These cookies allow us to improve our service and user
                experience.
              </p>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6">Functional Cookies</h3>
            <div className="space-y-4 text-gray-200">
              <p>
                These cookies enable enhanced functionality and personalization:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Preference cookies:</strong> Remember your language
                  and region settings
                </li>
                <li>
                  <strong>Theme cookies:</strong> Save your display preferences
                </li>
                <li>
                  <strong>Event cookies:</strong> Remember events you&apos;ve shown
                  interest in
                </li>
                <li>
                  <strong>Notification cookies:</strong> Track your notification
                  preferences
                </li>
              </ul>
              <p>
                Without these cookies, some features may not function properly.
              </p>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6">Third-Party Cookies</h3>
            <div className="space-y-4 text-gray-200">
              <p>
                Some of our pages may contain content from third parties that
                may set their own cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Social media plugins:</strong> Facebook, Twitter,
                  Instagram embeds
                </li>
                <li>
                  <strong>Video embeds:</strong> YouTube or Vimeo content
                </li>
                <li>
                  <strong>Maps:</strong> Google Maps integration
                </li>
                <li>
                  <strong>Payment processors:</strong> Secure payment handling
                </li>
              </ul>
              <p>
                We do not control these third-party cookies. Please check their
                respective privacy policies for more information.
              </p>
            </div>
          </section>

          <section className="bg-[#f2f862]/10 p-8 rounded-2xl border-l-4 border-[#f2f862]">
            <h3 className="text-2xl font-bold mb-6">How to Control Cookies</h3>
            <div className="space-y-4 text-gray-200">
              <p>You have several options to control cookies:</p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Browser Settings
                  </h4>
                  <p>Most browsers allow you to:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>View cookies stored on your device</li>
                    <li>Delete existing cookies</li>
                    <li>Block cookies from specific websites</li>
                    <li>Block all cookies</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Platform Settings
                  </h4>
                  <p>
                    When available, you can manage cookie preferences through
                    your account settings on our platform.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">
                    Opt-out Tools
                  </h4>
                  <p>You can opt out of analytics cookies through:</p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Google Analytics Opt-out Browser Add-on</li>
                    <li>Network Advertising Initiative opt-out tool</li>
                    <li>Digital Advertising Alliance opt-out tool</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-lg border border-[#f2f862]/20 mt-4">
                <p className="text-sm text-[#f2f862]">
                  <strong>Important:</strong> Disabling cookies may affect the
                  functionality of our platform and limit your ability to use
                  certain features.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6">Changes to This Policy</h3>
            <div className="space-y-4 text-gray-200">
              <p>
                We may update this Cookie Policy from time to time to reflect
                changes in:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The cookies we use</li>
                <li>Legal requirements</li>
                <li>Our platform functionality</li>
              </ul>
              <p>
                We recommend that you check this page periodically for any
                changes.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <div className="bg-white/5 p-8 rounded-2xl text-white text-center border border-white/10">
            <div className="flex justify-center mb-4">
              <FaEnvelope className="text-[#f2f862] text-2xl" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Questions About Cookies?
            </h3>
            <p className="text-gray-300 mb-6">
              If you have any questions about our use of cookies or other
              technologies, please contact us.
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

export default Cookies;
