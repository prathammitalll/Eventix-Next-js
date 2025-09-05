"use client"
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import eventsData from "../data/eventsData";

interface FormData {
  name: string;
  email: string;
  phone: string;
  college: string;
}

const RegisterEvent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('id');

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    college: "",
  });

  const event = eventsData.find((e) => e.id === (eventId ? parseInt(eventId) : null));

  if (!event) {
    return <div>Event not found</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    
    // Redirect to success page or show success message
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black text-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">
            Register for <span className="text-[#f2f862]">{event.title}</span>
          </h1>

          <div className="bg-white/5 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-[#f2f862] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-[#f2f862] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-[#f2f862] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="college" className="block text-sm font-medium mb-2">
                  College Name
                </label>
                <input
                  type="text"
                  id="college"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:border-[#f2f862] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#f2f862] text-black py-3 rounded-lg font-semibold hover:bg-[#e8e356] transition-colors"
              >
                Register Now
              </button>
            </form>
          </div>

          <button
            onClick={() => router.back()}
            className="mt-6 text-[#f2f862] hover:text-[#e8e356] font-medium transition-colors"
          >
            ← Back to Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterEvent;
