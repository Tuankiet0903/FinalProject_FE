import { Search,MessageSquare, Clipboard,Monitor,Clock,Grid,Languages,ChevronDown,Plus,AlertCircle,RefreshCcw,Menu,} from "lucide-react";
import logo from "../../assets/logo-clickup.svg";
import { useState } from "react";
import avatarPlaceholder from "../../assets/avt.png";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const iconClass = "w-5 h-5 text-white hover:text-gray-300 transition";
  const buttonClass = "p-2 bg-[#372C81] hover:bg-white/10 rounded-lg transition";
  const userAvatar = avatarPlaceholder;

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-[#372C81] shadow-md w-full">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <button className={buttonClass}>
          <img src={logo} alt="Logo" className="w-7 h-7" />
        </button>
      </div>

      {/* Middle section */}
      <div className="flex-grow flex justify-center">
        <div className="relative w-[500px] max-w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-white/10 text-white placeholder-white/50 pl-12 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="hidden md:flex items-center gap-3">
        <div className="flex items-center bg-white/10 rounded-lg px-4 py-2 gap-3">
          <AlertCircle className={iconClass} />
          <span className="text-white text-sm">AI</span>
        </div>
        <button className="px-5 py-2 bg-[#FF29C0] hover:bg-[#E020A0] text-white rounded-lg text-sm transition">
          Upgrade
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#372C81] text-white rounded-lg text-sm transition">
          <Plus className={iconClass} />
          New
        </button>
        {/* Additional action icons */}
        <div className="flex items-center gap-3">
          {[MessageSquare, Clipboard, Monitor, Clock, Grid, Languages].map((Icon, i) => (
            <button key={i} className={buttonClass}>
              <Icon className={iconClass} />
            </button>
          ))}
        </div>
        <button className={buttonClass}>
          <RefreshCcw className={iconClass} />
        </button>
        <button className="flex items-center gap-2 p-1 bg-[#372C81] hover:bg-white/10 rounded-md transition ml-1">
          <img src={userAvatar} alt="User Avatar" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover" />
          <ChevronDown className={iconClass} />
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
        <Menu className={iconClass} />
      </button>

      {/* Mobile Menu */}
      <MobileMenu menuOpen={menuOpen} iconClass={iconClass} buttonClass={buttonClass} setMenuOpen={setMenuOpen} />
    </header>
  );
};

export default Header;