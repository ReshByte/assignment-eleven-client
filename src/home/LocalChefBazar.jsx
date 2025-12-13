import React from "react";
import { motion } from "framer-motion";

const LocalChefBazar = () => {
  return (
    <section className="relative bg-pink-50">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80"
          alt=""
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/50 to-pink-600/60"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 py-24 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
        {/* Text */}
        <motion.div
          className="md:w-1/2 text-white"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
            LocalChefBazaar
          </h2>
          <p className="text-lg mb-6 drop-shadow-md">
            Explore fresh, homemade meals from talented local chefs. Enjoy
            authentic flavors, support local talent, and have meals delivered
            right to your doorstep.
          </p>
          <ul className="text-white mb-6 space-y-2 list-disc list-inside drop-shadow-md">
            <li>Browse local chefs and their menus</li>
            <li>Secure payments with Stripe integration</li>
            <li>Track orders in real-time</li>
            <li>Responsive and user-friendly design</li>
          </ul>
          <motion.button
            className="bg-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-pink-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Explore Now
          </motion.button>
        </motion.div>

        {/* Image */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://i.ibb.co.com/tMtzhPbp/istockphoto-516329534-612x612.jpg"
            alt=""
            className="rounded-xl shadow-2xl border-4 border-pink-300"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default LocalChefBazar;
