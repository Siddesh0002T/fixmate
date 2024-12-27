// components/Loader.tsx
const Loader = () => {
    return (
      <div className="flex-col gap-4 w-full flex items-center justify-center fixed inset-0 bg-white bg-opacity-75 z-50">
        <div className="w-20 h-20 border-4 border-transparent text-purple-300 text-4xl animate-spin flex items-center justify-center border-t-[#d1b3ff] rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-pink-300 text-2xl animate-spin flex items-center justify-center border-t-[#fcbad3] rounded-full"></div>
        </div>
      </div>
    );
  };
  
  export default Loader;
  