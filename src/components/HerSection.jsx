import React from "react";

const HeroSection = () => {
  // const bgImage =
  //   "url('https://plus.unsplash.com/premium_photo-1677699514992-05511883de1c?fm=jpg&q=60&w=3000&auto=format&fit=crop')";

    const bgImage ="";

  return (
    <div
      className="relative w-full h-[30vh] md:min-h-screen bg-cover bg-center bg-no-repeat flex items-start md:items-center"
      style={{ backgroundImage: bgImage }}>
        <img className="w-full h-fit" src="./tawakkul.png" alt="" />
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/50 md:bg-black/60"></div> */}

      {/* Content */}
      {/* <div className="relative z-10 px-4 lg:ml-48 md:px-10 text-white max-w-xl mt-11 md:mt-0">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-5">
          ধৈর্য ফাউন্ডেশন
        </h1>

        <p className="text-lg mb-4 md:mb-6 w-3/4">
          কুরআন ও হাদিসের আলোকে ধৈর্য (সবর) মানুষের জীবনের এক গুরুত্বপূর্ণ গুণ,
          যা কষ্টের সময় শক্তি দেয় এবং সঠিক পথে অটল থাকতে সাহায্য করে।
        </p>

        <div className="flex gap-3 md:gap-4">
          <button className="bg-brand-primary px-4 py-2 rounded-md text-white text-sm md:text-base">
            ব্লগসমূহ
          </button>

          <button className="border border-white px-4 py-2 rounded-md text-white text-sm md:text-base hover:bg-white hover:text-black transition">
            সকল কার্যক্রম
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default HeroSection;
