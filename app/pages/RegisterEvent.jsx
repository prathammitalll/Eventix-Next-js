import React, { useState } from "react";
"use client"
import { useRouter, useSearchParams } from "next/navigation";
import eventsData from "../data/eventsData";

export default function RegisterEvent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const event = eventsData.find((e) => String(e.id) === String(eventId));

  // Registration state
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    mobile: "",
    firstName: "",
    lastName: "",
    gender: "",
    institute: "",
    type: "",
    city: "",
    state: "",
    country: "",
    year: "",
    branch: "",
    rollNumber: "",
    address: "",
    dob: "",
  });
  const [registered, setRegistered] = useState(false);

  // Simulate registration status globally (for demo, use localStorage)
  React.useEffect(() => {
    if (eventId && localStorage.getItem(`registered_${eventId}`) === "true") {
      setRegistered(true);
    }
  }, [eventId]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGender = (gender) => {
    setForm((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleBack = () => {
    if (step === 1) {
      router.push(`/events/${eventId}`);
    } else {
      setStep((s) => s - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Submit registration
      setRegistered(true);
      if (eventId) localStorage.setItem(`registered_${eventId}`, "true");
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-white mb-4">Event Not Found</h2>
        <button
          className="mt-4 px-6 py-2 bg-[#f2f862] text-black rounded-full font-semibold"
          onClick={() => router.push("/events")}
        >
          Back to Events
        </button>
      </div>
    );
  }

  // Progress bar steps
  const steps = [{ label: "Candidate Details" }, { label: "Confirmation" }];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Fixed Event Name Header */}
      <div className="w-full bg-[#f2f862] py-4 px-6 shadow z-20 fixed top-0 left-0 right-0">
        <h1 className="text-xl md:text-2xl font-bold text-black text-center">
          {event.title}
        </h1>
      </div>

      {/* Fixed Progress Bar */}
      <div className="w-full bg-black px-6 pt-6 pb-2 fixed top-16 left-0 right-0 z-20">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          {steps.map((s, idx) => (
            <React.Fragment key={s.label}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold
                    ${
                      step > idx
                        ? "bg-[#f2f862] text-black"
                        : "bg-white/10 text-white"
                    }
                  `}
                >
                  {idx + 1}
                </div>
                <span className="text-xs text-gray-300 mt-1">{s.label}</span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full ${
                    step > idx ? "bg-[#f2f862]" : "bg-white/10"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Form Section - scrollable, with padding for fixed header/footer */}
      <div className="flex-1 flex flex-col items-center justify-center overflow-auto pt-[120px] pb-[90px]">
        <div className="w-full max-w-xl mx-auto px-2 py-8">
          <form
            className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl text-white space-y-6"
            onSubmit={handleNext}
            style={{ minHeight: 520 }}
          >
            {registered ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-bold mb-2 text-[#f2f862]">
                  You are Registered!
                </h2>
                <p className="text-gray-300 mb-6">
                  Thank you for registering for <b>{event.title}</b>.
                </p>
                <button
                  type="button"
                  className="bg-[#f2f862] text-black font-bold px-8 py-3 rounded-full shadow hover:bg-[#e8e356] transition"
                  onClick={() => router.push(`/events/${eventId}`)}
                >
                  Go to Event Details
                </button>
              </div>
            ) : (
              <>
                {step === 1 && (
                  <>
                    <div>
                      <label className="block text-sm mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#f2f862]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Mobile</label>
                      <input
                        type="tel"
                        name="mobile"
                        required
                        value={form.mobile}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#f2f862]/50"
                        placeholder="+91-XXXXXXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#f2f862]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">
                        Last Name (if applicable)
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#f2f862]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Gender</label>
                      <div className="flex flex-wrap gap-2">
                        {["Female", "Male", "Prefer not to say"].map((g) => (
                          <button
                            type="button"
                            key={g}
                            className={`px-4 py-2 rounded-lg border text-sm font-medium ${
                              form.gender === g
                                ? "bg-[#f2f862] text-black border-[#f2f862]"
                                : "bg-white/10 text-white border-white/20"
                            }`}
                            onClick={() => handleGender(g)}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-1">
                        Institute Name
                      </label>
                      <input
                        type="text"
                        name="institute"
                        required
                        value={form.institute}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#f2f862]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Type</label>
                      <input
                        type="text"
                        name="type"
                        required
                        value={form.type}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#f2f862]/50"
                        placeholder="Student / Faculty / Other"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        required
                        value={form.dob}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#f2f862]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={form.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#f2f862]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        required
                        value={form.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#f2f862]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Country</label>
                      <input
                        type="text"
                        name="country"
                        required
                        value={form.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#f2f862]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Year</label>
                      <input
                        type="text"
                        name="year"
                        value={form.year}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#f2f862]/50"
                        placeholder="e.g. 2nd Year"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Branch</label>
                      <input
                        type="text"
                        name="branch"
                        value={form.branch}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#f2f862]/50"
                        placeholder="e.g. CSE, ECE"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Roll Number</label>
                      <input
                        type="text"
                        name="rollNumber"
                        value={form.rollNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#f2f862]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Address</label>
                      <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#f2f862]/50"
                        rows={2}
                      />
                    </div>
                  </>
                )}
                {step === 2 && (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">🎉</div>
                    <h2 className="text-2xl font-bold mb-2 text-[#f2f862]">
                      Confirm Registration
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Please confirm your details and click Submit to register
                      for <b>{event.title}</b>.
                    </p>
                    <div className="text-left text-white space-y-2 max-w-xs mx-auto">
                      <div>
                        <b>Email:</b> {form.email}
                      </div>
                      <div>
                        <b>Mobile:</b> {form.mobile}
                      </div>
                      <div>
                        <b>Name:</b> {form.firstName} {form.lastName}
                      </div>
                      <div>
                        <b>Gender:</b> {form.gender}
                      </div>
                      <div>
                        <b>Institute:</b> {form.institute}
                      </div>
                      <div>
                        <b>Type:</b> {form.type}
                      </div>
                      <div>
                        <b>Date of Birth:</b> {form.dob}
                      </div>
                      <div>
                        <b>City:</b> {form.city}
                      </div>
                      <div>
                        <b>State:</b> {form.state}
                      </div>
                      <div>
                        <b>Country:</b> {form.country}
                      </div>
                      <div>
                        <b>Year:</b> {form.year}
                      </div>
                      <div>
                        <b>Branch:</b> {form.branch}
                      </div>
                      <div>
                        <b>Roll Number:</b> {form.rollNumber}
                      </div>
                      <div>
                        <b>Address:</b> {form.address}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </form>
        </div>
      </div>

      {/* Fixed Back/Next Buttons */}
      {!registered && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-white/10 px-4 py-4 flex justify-between items-center z-30">
          <button
            type="button"
            className="bg-white/10 text-white px-8 py-2 rounded-full font-semibold border border-white/20 hover:bg-white/20 transition"
            onClick={handleBack}
          >
            Back
          </button>
          {!registered && (
            <button
              type="button"
              className="bg-[#f2f862] text-black font-bold px-8 py-2 rounded-full shadow hover:bg-[#e8e356] transition"
              onClick={handleNext}
            >
              {step === 1 ? "Next" : "Submit"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
