import React from "react";
import { CalendarDays, Star, Moon, Globe2, Activity } from "lucide-react";

const events = [
  {
    type: "Meteor Shower",
    name: "Chitrakote Waterfall Viewpoint",
    date: "2025-12-14",
    time: "9:00 PM – 4:00 AM",
    location: "Bastar, CG",
    icon: <Star className="text-yellow-400" />,
    description: "Peak viewing for the Geminids, with up to 120 meteors per hour expected!",
  },
  {
    type: "Lunar Eclipse",
    name: "Mainpat Hill Station",
    date: "2025-11-29",
    time: "6:30 PM – 10:00 PM",
    location: "Surguja",
    icon: <Moon className="text-purple-400" />,
    description: "Watch as the Earth's shadow covers part of the moon this evening.",
  },
  {
    type: "Stargazing",
    name: "Dantewada Hills",
    date: "2025-11-25",
    time: "7:08 PM – 7:12 PM",
    location: "Dantewada, Chhattisgarh",
    icon: <Globe2 className="text-cyan-400" />,
    description: "Look up for the bright moving dot – that's the ISS passing overhead!",
  },
  {
    type: "New Moon",
    name: "New Moon Night",
    date: "2025-11-23",
    time: "All night",
    location: "Bhilai Institute Of Technology, Durg",
    icon: <Activity className="text-slate-200" />,
    description: "Perfect dark sky conditions for deep-sky observations.",
  },
];

export function AstronomyCalendar() {
  return (
    <section className="py-12 bg-slate-900/70 dark:bg-slate-950/85 rounded-xl max-w-3xl mx-auto mb-12 shadow-xl">
      <div className="text-center mb-8">
        <CalendarDays className="mx-auto h-10 w-10 text-sky-400 mb-2" />
        <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
          Upcoming Celestial Events
        </h3>
        <p className="text-md text-slate-400">
          Don’t miss these highlights—Chhattisgarh’s best viewing opportunities below!
        </p>
      </div>
      <ul className="space-y-6">
        {events.map((evt, idx) => (
          <li
            key={idx}
            className="flex flex-col md:flex-row md:items-center bg-slate-800/80 dark:bg-slate-900 rounded-lg px-6 py-5 shadow transition hover:bg-sky-900/40"
          >
            <div className="flex items-center mb-3 md:mb-0 md:mr-6">
              <span className="mr-3">{evt.icon}</span>
              <span className="text-lg font-semibold text-sky-300">{evt.type}</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white">{evt.name}</div>
              <div className="text-sm text-slate-400">{evt.date} &bull; {evt.time}</div>
              <div className="text-xs text-sky-200">{evt.location}</div>
              <div className="text-xs mt-2 text-slate-300">{evt.description}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
