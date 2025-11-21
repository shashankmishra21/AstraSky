import React, { useState } from "react";
import { Star } from "lucide-react";

// --- 1. Data type ---
type ObservationReport = {
  id: string;
  site: string;
  date: string;
  rating: number;
  notes: string;
  author: string;
};

// --- 2. Observation Form ---
function ObservationForm({ onAdd }: { onAdd: (report: ObservationReport) => void }) {
  const [site, setSite] = useState("");
  const [date, setDate] = useState("");
  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState("");

  return (
    <form
      className="bg-slate-800 rounded-lg p-6 mb-6 shadow"
      onSubmit={e => {
        e.preventDefault();
        onAdd({
          id: Math.random().toString(36).substring(2, 9),
          site,
          date,
          rating,
          notes,
          author: "You", // Replace with actual user name if you add auth
        });
        setSite(""); setDate(""); setRating(5); setNotes("");
      }}
    >
      <h4 className="text-xl text-sky-300 font-semibold mb-3">Log Your Observation</h4>
      <input
        type="text"
        placeholder="Location/Site"
        className="mb-2 w-full rounded px-2 py-1 bg-slate-700 text-white border"
        value={site}
        onChange={e => setSite(e.target.value)}
        required
      />
      <input
        type="date"
        className="mb-2 w-full rounded px-2 py-1 bg-slate-700 text-white border"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />
      <select
        className="mb-2 w-full rounded px-2 py-1 bg-slate-700 text-white border"
        value={rating}
        onChange={e => setRating(Number(e.target.value))}
      >
        {[1,2,3,4,5].map(val => (
          <option key={val} value={val}>{val} Stars</option>
        ))}
      </select>
      <textarea
        placeholder="Notes/Summary"
        className="mb-2 w-full rounded px-2 py-1 bg-slate-700 text-white border"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        required
      />
      <button
        type="submit"
        className="px-5 py-2 bg-sky-500 text-white font-bold rounded shadow hover:bg-sky-600 transition"
      >
        Add Observation
      </button>
    </form>
  );
}

// --- 3. Observation Feed ---
function ObservationFeed({ reports }: { reports: ObservationReport[] }) {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-bold text-white mb-3">Community Feed</h4>
      {reports.length === 0 ? (
        <p className="text-slate-400">No reports yet.</p>
      ) : (
        reports.slice(0, 7).map(report => (
          <div
            key={report.id}
            className="bg-slate-700 rounded-lg p-5 shadow flex flex-col md:flex-row md:items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sky-300">{report.site}</span>
              <span className="text-xs text-slate-500">{report.date}</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(report.rating)].map((_, i) => (
                <Star key={i} size={16} />
              ))}
            </div>
            <div className="flex-1 text-slate-300">{report.notes}</div>
            <span className="text-xs text-sky-200 font-mono">{report.author}</span>
          </div>
        ))
      )}
    </div>
  );
}

// --- 4. Main Journal Section ---
export function ObservationJournal() {
  const [reports, setReports] = useState<ObservationReport[]>([
    {
      id: "1",
      site: "Mainpat Hill Station",
      date: "2025-11-20",
      rating: 5,
      notes: "Absolutely stunning! Clear skies and visible meteor trails.",
      author: "Shashank",
    },
  ]);

  return (
    <section className="max-w-3xl mx-auto py-12 px-4 rounded-xl bg-slate-900/80 shadow-xl mb-12">
      <ObservationForm
        onAdd={report => setReports([report, ...reports])}
      />
      <ObservationFeed reports={reports} />
    </section>
  );
}
