import React, { useEffect } from "react";
import Banner from "./Banner";
import SixCardShow from "./SixCardShow";
import Review from "./Review";
import LocalChefBazar from "./LocalChefBazar";

const Home = () => {
  // 🔹 Dynamic Browser Tab Title
  useEffect(() => {
    document.title = "Home | Chef App";
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* Banner Section */}
      <section className="w-full">
        <Banner />
      </section>

      {/* Six Card Section */}
      <section className="w-full mx-auto px-4 mt-110 md:px-10 lg:px-20 -mt-0">
        <SixCardShow />
      </section>

      {/* Review Section */}
      <section className="w-full py-16 px-4 md:px-10 lg:px-20">
        <Review />
      </section>

      {/* Local Chef Bazar Section */}
      <section className="my-10 mb-30">
        <LocalChefBazar />
      </section>
    </div>
  );
};

export default Home;
