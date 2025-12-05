import React from "react";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-12 pb-6 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent">
            LocalChefBazaar
          </h1>
          <p className="mt-3 text-gray-600">
            Home-cooked meals delivered with love ❤️
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="footer-title opacity-100 text-lg font-semibold">
            Contact Details
          </h3>
          <p className="mt-2 text-gray-600">📍 Dhaka,Bangladesh</p>
          <p className="text-gray-600">📞 +880 1763254017</p>
          <p className="text-gray-600">✉ redwanreshat@gmail.com</p>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="footer-title opacity-100 text-lg font-semibold">
            Working Hours
          </h3>
          <p className="mt-2 text-gray-600">Mon - Fri: 9:00 AM – 10:00 PM</p>
          <p className="text-gray-600">Saturday: 10:00 AM – 11:00 PM</p>
          <p className="text-gray-600">Sunday: Closed</p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="footer-title opacity-100 text-lg font-semibold">
            Follow Us
          </h3>

          <div className="flex gap-4 mt-3">
            {/* Facebook */}
            <a
              className="p-2 bg-white rounded-full shadow hover:bg-pink-100 transition"
              href="#"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-pink-600"
              >
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              className="p-2 bg-white rounded-full shadow hover:bg-pink-100 transition"
              href="#"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-pink-600"
              >
                <path d="M24 4.56c-.89.39-1.85.65-2.86.77 1.03-.62 1.81-1.59 2.17-2.75-.96.57-2.04.98-3.17 1.2a5.44 5.44 0 0 0-9.29 4.96C7.69 8.6 4.06 6.63 1.64 3.16c-.99 1.71-.48 4.02 1.21 5.18-.8-.03-1.56-.25-2.23-.61 0 2.28 1.58 4.42 3.95 4.89-.69.19-1.45.23-2.23.08.63 1.96 2.46 3.38 4.6 3.42A10.87 10.87 0 0 1 0 19.54a15.27 15.27 0 0 0 8.29 2.43c9.11 0 14.29-7.72 13.99-14.65.96-.7 1.8-1.57 2.47-2.56z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              className="p-2 bg-white rounded-full shadow hover:bg-pink-100 transition"
              href="#"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-pink-600"
              >
                <path d="M12 2c2.7 0 3.03.01 4.1.06 1.06.05 1.78.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.89 1.11 1.15 1.77.25.65.42 1.37.47 2.43.05 1.07.06 1.4.06 4.1s-.01 3.03-.06 4.1c-.05 1.06-.22 1.78-.47 2.43a4.57 4.57 0 0 1-1.15 1.77c-.55.55-1.11.89-1.77 1.15-.65.25-1.37.42-2.43.47-1.07.05-1.4.06-4.1.06s-3.03-.01-4.1-.06c-1.06-.05-1.78-.22-2.43-.47a4.57 4.57 0 0 1-1.77-1.15 4.57 4.57 0 0 1-1.15-1.77c-.25-.65-.42-1.37-.47-2.43C2.01 15.03 2 14.7 2 12s.01-3.03.06-4.1c.05-1.06.22-1.78.47-2.43a4.57 4.57 0 0 1 1.15-1.77 4.57 4.57 0 0 1 1.77-1.15c.65-.25 1.37-.42 2.43-.47C8.97 2.01 9.3 2 12 2zm0 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm6.5-.2a1.3 1.3 0 1 1-2.6 0 1.3 1.3 0 0 1 2.6 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-10 border-t pt-4">
        <p className="text-gray-500">
          © {new Date().getFullYear()} LocalChefBazaar — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
