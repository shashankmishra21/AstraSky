export function FeaturedSitesSection() {
  const sites = [
    { name: "Tirupati Observatory", image: "/images/tirupati.jpg", rating: 4.8, fact: "Best for meteor showers." },
    { name: "Pune Sky Park", image: "/images/pune.jpg", rating: 4.7, fact: "Great for planetary viewing." },
    // Add more sites...
  ];
  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-8">Featured Observation Sites</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sites.map(site => (
          <div key={site.name} className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6">
            <img src={site.image} alt={site.name} className="rounded mb-4 h-40 w-full object-cover" />
            <h3 className="text-2xl font-semibold">{site.name}</h3>
            <p className="text-slate-500">{site.fact}</p>
            <div className="mt-2 text-yellow-400">⭐ {site.rating}</div>
          </div>
        ))}
      </div>
    </section>
  );
}