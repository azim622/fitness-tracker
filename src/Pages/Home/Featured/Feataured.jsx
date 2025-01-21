import React from 'react';

const Feataured = () => {
    return (
        <div>
             <section className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">Explore Fitness Artifacts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://i.ibb.co.com/BgvdJbs/photo-state-art-fitness-exercise-gadgets-933496-38524.jpg" alt="Fitness Tools" className="h-20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fitness Artifacts Collection</h3>
            <p>Explore a wide range of historical fitness tools and artifacts.</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://i.ibb.co.com/1LCJ2Ht/nominated-t20-4lxnr-X-1-scaled-1.jpg" alt="History" className="h-20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Historical Significance</h3>
            <p>Learn the history behind each artifact and its use in ancient fitness practices.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://i.ibb.co.com/10Ff293/gym.webp" alt="Preservation" className="h-20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Artifact Preservation</h3>
            <p>Ensuring the longevity and preservation of historical fitness artifacts.</p>
          </div>
        </div>
      </div>
    </section>
        </div>
    );
};

export default Feataured;