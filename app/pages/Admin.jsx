"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import eventsData from "../data/eventsData";

export default function AdminPage() {
  const [tab, setTab] = useState("events");
  const [events, setEvents] = useState(eventsData);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    ampm: "AM",
    category: "",
    location: "",
    organizer: "",
    price: "",
    status: "upcoming",
    image: "",
    description: "",
    maxAttendees: 100,
  });
  const router = useRouter();

  // Handle add or update event
  const handleAddOrUpdateEvent = (e) => {
    e.preventDefault();
    // Combine time and ampm for display
    const timeString = newEvent.time ? `${newEvent.time} ${newEvent.ampm}` : "";
    if (editId) {
      setEvents(
        events.map((ev) =>
          ev.id === editId ? { ...ev, ...newEvent, time: timeString } : ev
        )
      );
      setEditId(null);
    } else {
      setEvents([
        {
          ...newEvent,
          id: Date.now(),
          attendees: 0,
          tags: [],
          time: timeString,
        },
        ...events,
      ]);
    }
    setShowAdd(false);
    setNewEvent({
      title: "",
      date: "",
      time: "",
      ampm: "AM",
      category: "",
      location: "",
      organizer: "",
      price: "",
      status: "upcoming",
      image: "",
      description: "",
      maxAttendees: 100,
    });
  };

  // Handle edit event
  const handleEdit = (ev) => {
    // Extract time and am/pm if possible
    let time = "";
    let ampm = "AM";
    if (ev.time) {
      const match = ev.time.match(/^(\d{2}:\d{2})\s*(AM|PM)?$/i);
      if (match) {
        time = match[1];
        ampm = match[2] ? match[2].toUpperCase() : "AM";
      } else {
        time = ev.time.slice(0, 5);
      }
    }
    setEditId(ev.id);
    setShowAdd(true);
    setNewEvent({
      title: ev.title,
      date: ev.date,
      time,
      ampm,
      category: ev.category,
      location: ev.location,
      organizer: ev.organizer,
      price: ev.price,
      status: ev.status,
      image: ev.image,
      description: ev.description,
      maxAttendees: ev.maxAttendees,
    });
  };

  // Handle delete event
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((ev) => ev.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex bg-[#101014] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#23233b] to-[#18181b] border-r border-white/10 flex flex-col py-8 px-6 shadow-2xl">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#f2f862] flex items-center justify-center text-black font-black text-2xl shadow">
              E
            </div>
            <span className="font-bold text-lg tracking-wide">Eventix 360</span>
          </div>
          <button
            className="w-full bg-[#f2f862] text-black px-4 py-2 rounded-full font-semibold hover:bg-[#e8e356] transition"
                            onClick={() => router.push("/")}
          >
            ⬅️ Go to Home
          </button>
        </div>
        <nav className="flex flex-col gap-2 mb-8 mt-8">
          <button
            className={`flex items-center gap-2 text-left px-4 py-2 rounded-lg font-medium transition ${
              tab === "events"
                ? "bg-[#f2f862] text-black shadow"
                : "hover:bg-white/10"
            }`}
            onClick={() => {
              setTab("events");
              setShowAdd(false);
              setEditId(null);
            }}
          >
            <span className="text-xl">🎉</span> Events
          </button>
          <button
            className={`flex items-center gap-2 text-left px-4 py-2 rounded-lg font-medium transition ${
              tab === "registered"
                ? "bg-[#f2f862] text-black shadow"
                : "hover:bg-white/10"
            }`}
            onClick={() => {
              setTab("registered");
              setShowAdd(false);
              setEditId(null);
            }}
          >
            <span className="text-xl">👥</span> Registered Users
          </button>
        </nav>
        <div className="mt-auto text-xs text-gray-400 pt-8">
          &copy; {new Date().getFullYear()} Eventix 360
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen bg-[#101014]">
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#18181b] shadow">
          <h1 className="text-2xl font-bold capitalize tracking-wide">
            {tab === "events" ? "Events" : "Registered Users"}
          </h1>
        </div>
        <div className="flex-1 p-8 overflow-auto">
          {tab === "events" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Events List</h2>
                <button
                  className="bg-[#f2f862] text-black px-4 py-2 rounded-full font-semibold shadow hover:bg-[#e8e356] transition"
                  onClick={() => {
                    setShowAdd((v) => !v);
                    setEditId(null);
                    setNewEvent({
                      title: "",
                      date: "",
                      time: "",
                      ampm: "AM",
                      category: "",
                      location: "",
                      organizer: "",
                      price: "",
                      status: "upcoming",
                      image: "",
                      description: "",
                      maxAttendees: 100,
                    });
                  }}
                >
                  {showAdd ? "Close" : "Add Event"}
                </button>
              </div>
              {showAdd && (
                <form
                  className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 space-y-4 shadow"
                  onSubmit={handleAddOrUpdateEvent}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      className="px-3 py-2 rounded bg-black/30 border border-white/20"
                      placeholder="Title"
                      value={newEvent.title}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, title: e.target.value })
                      }
                      required
                    />
                    <input
                      className="px-3 py-2 rounded bg-black/30 border border-white/20"
                      placeholder="Date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, date: e.target.value })
                      }
                      required
                    />
                    <div className="flex gap-2">
                      <input
                        className="px-3 py-2 rounded bg-black/30 border border-white/20 flex-1"
                        placeholder="Time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, time: e.target.value })
                        }
                        required
                      />
                      <select
                        className="px-2 py-2 rounded bg-black/30 border border-white/20"
                        value={newEvent.ampm}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, ampm: e.target.value })
                        }
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                    <input
                      className="px-3 py-2 rounded bg-black/30 border border-white/20"
                      placeholder="Category"
                      value={newEvent.category}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, category: e.target.value })
                      }
                      required
                    />
                    <input
                      className="px-3 py-2 rounded bg-black/30 border border-white/20"
                      placeholder="Location"
                      value={newEvent.location}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, location: e.target.value })
                      }
                      required
                    />
                    <input
                      className="px-3 py-2 rounded bg-black/30 border border-white/20"
                      placeholder="Organizer"
                      value={newEvent.organizer}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, organizer: e.target.value })
                      }
                      required
                    />
                    <input
                      className="px-3 py-2 rounded bg-black/30 border border-white/20"
                      placeholder="Price"
                      value={newEvent.price}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, price: e.target.value })
                      }
                    />
                    <input
                      className="px-3 py-2 rounded bg-black/30 border border-white/20"
                      placeholder="Image URL"
                      value={newEvent.image}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, image: e.target.value })
                      }
                    />
                    <input
                      className="px-3 py-2 rounded bg-black/30 border border-white/20"
                      placeholder="Max Attendees"
                      type="number"
                      value={newEvent.maxAttendees}
                      onChange={(e) =>
                        setNewEvent({
                          ...newEvent,
                          maxAttendees: e.target.value,
                        })
                      }
                    />
                    <select
                      className="px-3 py-2 rounded bg-black/30 border border-white/20"
                      value={newEvent.status}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, status: e.target.value })
                      }
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="past">Past</option>
                    </select>
                  </div>
                  <textarea
                    className="w-full px-3 py-2 rounded bg-black/30 border border-white/20"
                    placeholder="Description"
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#f2f862] text-black px-6 py-2 rounded-full font-semibold shadow hover:bg-[#e8e356] transition"
                  >
                    {editId ? "Update Event" : "Add Event"}
                  </button>
                </form>
              )}
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-white rounded-xl overflow-hidden shadow">
                  <thead>
                    <tr className="bg-[#23233b]">
                      <th className="py-2 px-4 text-left">Title</th>
                      <th className="py-2 px-4 text-left">Date</th>
                      <th className="py-2 px-4 text-left">Time</th>
                      <th className="py-2 px-4 text-left">Category</th>
                      <th className="py-2 px-4 text-left">Location</th>
                      <th className="py-2 px-4 text-left">Status</th>
                      <th className="py-2 px-4 text-left">Attendees</th>
                      <th className="py-2 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((ev) => (
                      <tr
                        key={ev.id}
                        className="border-t border-white/10 hover:bg-white/5 transition"
                      >
                        <td className="py-2 px-4">{ev.title}</td>
                        <td className="py-2 px-4">{ev.date}</td>
                        <td className="py-2 px-4">{ev.time}</td>
                        <td className="py-2 px-4">{ev.category}</td>
                        <td className="py-2 px-4">{ev.location}</td>
                        <td className="py-2 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              ev.status === "upcoming"
                                ? "bg-green-600/20 text-green-400"
                                : "bg-gray-600/20 text-gray-400"
                            }`}
                          >
                            {ev.status.charAt(0).toUpperCase() +
                              ev.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-2 px-4">
                          {ev.attendees}/{ev.maxAttendees}
                        </td>
                        <td className="py-2 px-4 space-x-2">
                          <button
                            className="bg-[#f2f862] text-black px-3 py-1 rounded-full text-xs font-semibold"
                            onClick={() => handleEdit(ev)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-xs font-semibold"
                            onClick={() => handleDelete(ev.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === "registered" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Registered Users</h2>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-gray-300">
                {/* Placeholder: Implement registered users listing here */}
                <p>Registered users for each event will be shown here.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
