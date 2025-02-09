const MainLanding = () => {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          The everything app, for work.
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg sm:text-xl text-gray-600 mb-2">
            One app for projects, knowledge, conversations and more.
          </p>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">Get more done faster—together.</p>
        </div>
        <div className="flex flex-col items-center">
          <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
            Get started. It's FREE!
          </button>
          <span className="mt-2 text-sm text-gray-500">Free Forever. No Credit Card.</span>
        </div>
      </div>
    </div>
  );
};

export default MainLanding;
