
export default function SignupPage() {
  return (
  

 
      <main className="flex justify-center items-center px-4 mt-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Seconds to sign up!</h1>

          {/* Google Sign In Button */}
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 mb-6">
            <img src="/placeholder.svg" alt="Google" className="w-5 h-5" />
            <span>Tiếp tục sử dụng dịch vụ bằng Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">OR</span>
            </div>
          </div>

          {/* Signup Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
              <input
                type="email"
                placeholder="example@site.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <button className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700">
              Play with ClickUp
            </button>
          </form>
        </div>
      </main>
   
  );
}
