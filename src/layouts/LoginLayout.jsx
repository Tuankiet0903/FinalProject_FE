import { HelpCircle } from "lucide-react";
import LoginHeader from "../components/LoginHeader";

const LoginLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex flex-col">
      <LoginHeader />
      <main className="flex-1 flex justify-center items-center">{children}</main>
      
      <footer className="mb-20 text-center text-white/80 text-sm">
        <p>
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="#" className="underline">Privacy Policy</a> and{" "}
          <a href="#" className="underline">Terms of Service</a> apply.
        </p>
      </footer>

      {/* Help Button - Dấu ? */}
      <button
        className="fixed bottom-6 right-6 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Help"
      >
        <HelpCircle className="w-6 h-6 text-purple-600" />
      </button>
    </div>
  );
};

export default LoginLayout;
