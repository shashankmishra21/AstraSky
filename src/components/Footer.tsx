export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-800 text-slate-400 dark:text-slate-300 py-8">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p className="text-sm">&copy; {new Date().getFullYear()} AstraSky. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="https://github.com/shashankmishra21/AstraSky" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition">
            GitHub
          </a>
          <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition">
            Twitter
          </a>
          <a href="mailto:contact@astras.com" className="hover:text-sky-400 transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}