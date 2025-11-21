export function AboutSection() {
  return (
    <section className="py-20 text-center relative">
      {/* Decorative blurred background */}

      <div className="max-w-3xl mx-auto">
        <div className="bg-slate-900/80 dark:bg-slate-800/80 rounded-lg shadow-lg px-12 py-10">
          <h4 className="text-xl font-semibold text-white mb-2">About AstraSky</h4>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-8">
            We believe the night sky belongs to everyone, especially the people of Chhattisgarh. AstraSky is built to foster a global community of stargazers, share knowledge, and inspire curiosity about the universe. Whether you're a seasoned astronomer or a curious beginner, join us in exploring the wonders above!
          </p>
        </div>
      </div>
    </section>
  )
}
