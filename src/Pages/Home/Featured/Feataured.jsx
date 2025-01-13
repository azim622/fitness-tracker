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
            <img src="/path/to/icon1.png" alt="Fitness Tools" className="h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fitness Artifacts Collection</h3>
            <p>Explore a wide range of historical fitness tools and artifacts.</p>
          </div>
          
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="/path/to/icon2.png" alt="History" className="h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Historical Significance</h3>
            <p>Learn the history behind each artifact and its use in ancient fitness practices.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://i.ibb.co.com/PCM6cJ2/smart-watch-technology-with-sport-fitness-tracker-advertising-poster-website-banner-realistic-design.jpg" alt="Preservation" className="h-12 mx-auto mb-4" />
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