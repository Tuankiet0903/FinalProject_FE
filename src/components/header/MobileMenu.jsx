// MobileMenu Component
const MobileMenu = ({ menuOpen, iconClass, buttonClass, setMenuOpen }) => {
  if (!menuOpen) return null;
  return (
    <div className="absolute top-16 right-0 w-48 bg-[#372C81] shadow-md rounded-lg p-4 md:hidden">
      {[MessageSquare, Clipboard, Monitor, Clock, Grid, Languages].map((Icon, i) => (
        <button key={i} className="w-full flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg transition">
          <Icon className={iconClass} />
          <span className="text-white text-sm">Option {i + 1}</span>
        </button>
      ))}
    </div>
  );
};
export default MobileMenu;