import React from "react";
import { motion } from "framer-motion";

const Featured = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto text-center px-6">
        {/* Title with animation */}
        <motion.h2 
          className="text-4xl font-bold text-gray-800 mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Explore Fitness Artifacts
        </motion.h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://i.ibb.co/BgvdJbs/photo-state-art-fitness-exercise-gadgets-933496-38524.jpg" 
              alt="Fitness Tools" 
              className="h-24 w-auto mx-auto mb-4 rounded-md object-contain"
            />
            <h3 className="text-xl font-semibold mb-2">Fitness Artifacts Collection</h3>
            <p>Explore a wide range of historical fitness tools and artifacts.</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://i.ibb.co/1LCJ2Ht/nominated-t20-4lxnr-X-1-scaled-1.jpg" 
              alt="History" 
              className="h-24 rounded-md w-auto mx-auto mb-4 object-contain"
            />
            <h3 className="text-xl font-semibold mb-2">Historical Significance</h3>
            <p>Learn the history behind each artifact and its use in ancient fitness practices.</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            className="bg-white p-6 rounded-xl shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://i.ibb.co/10Ff293/gym.webp" 
              alt="Preservation" 
              className="h-24 w-auto rounded-md mx-auto mb-4 object-contain"
            />
            <h3 className="text-xl font-semibold mb-2">Artifact Preservation</h3>
            <p>Ensuring the longevity and preservation of historical fitness artifacts.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Featured;
