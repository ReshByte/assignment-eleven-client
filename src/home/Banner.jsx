import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const images = [
  "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
  "https://www.themealdb.com/images/media/meals/tzt3it1764363293.jpg",
  "https://www.themealdb.com/images/media/meals/1529445893.jpg",
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Auto-play the carousel every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () =>
    setCurrent((current - 1 + images.length) % images.length);
  const nextSlide = () => setCurrent((current + 1) % images.length);

  return (
    <div className="absolute w-full flex top-0 left-0 justify-center mt-30">
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((src, i) => (
              <div key={i} className="w-full shrink-0 relative">
                <img
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className="w-full h-[60vh] object-cover brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  current === i ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mb-[500px]"></div>
    </div>
  );
};

export default Banner;
