import { Logo } from "./Logo";
export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8 shadow-2xl border-t border-slate-800 relative z-50">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-3">
          <Logo className="justify-center mb-4" />
          <div>
            <p className="text-xs text-slate-400">
              Built by Team Dark Mode
            </p>
          </div>
        </div>

        <p className="text-sm">&copy; {new Date().getFullYear()} AstraSky. All rights reserved.</p>

        <div className="flex space-x-6">
          <a
            href="https://github.com/shashankmishra21/AstraSky"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition"
          >
            GitHub
          </a>
          <a
            href="https://x.com/mishrashashank_"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition"
          >
            Twitter
          </a>
          <a href="mailto:mishrashashank2106@gmail.com" className="hover:text-sky-400 transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}