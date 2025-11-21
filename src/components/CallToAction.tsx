export function CallToAction() {
  return (
    <section className="bg-gradient-to-br from-sky-900 via-slate-900 to-slate-950 py-16 text-center relative z-20">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to explore the night sky?
        </h2>
        <p className="text-lg md:text-xl text-slate-300 mb-8">
          Discover Chhattisgarh's best stargazing spots in real time, get personalized recommendations, and join our skywatching community.
        </p>
        <a
          href="/dashboard"
          className="inline-block px-8 py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-lg transition"
        >
          Start Observing Now
        </a>
        {/* Optional: Add a secondary call to action */}
        <div className="mt-6">
          <a
            href="mailto:mishrashashank2106@gmail.com"
            className="text-sky-300 underline hover:text-sky-400 transition"
          >
            Contact Team Dark Mode
          </a>
        </div>
      </div>
    </section>
  );
}
