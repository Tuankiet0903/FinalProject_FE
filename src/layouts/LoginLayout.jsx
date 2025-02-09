import LoginHeader from "../components/LoginHeader";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex flex-col">
      {/* Header luôn được render */}
      <LoginHeader />
      {/* Nội dung thay đổi theo route */}
      <main className="flex-1 h-screen justify-center items-center mt-20">
        {children}
      </main>
      {/* Footer */}
      <footer className="mb-20 text-center text-white/80 text-sm">
        <p>
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;