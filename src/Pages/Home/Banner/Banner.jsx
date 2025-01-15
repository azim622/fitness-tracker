import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div className="relative w-full">
      <Carousel 
        autoPlay 
        infiniteLoop 
        showThumbs={false} 
        showStatus={false} 
        interval={3500}
        transitionTime={700}
      >
        {/* Slide 1 */}
        <div className="relative">
          <img 
            src="https://i.ibb.co.com/BPWscpq/fitness-center-banner-design-template-23-2150017348.jpg" 
            className="w-full h-96 object-cover"
            alt="Fitness Center Banner 1"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
            <h2 className="text-3xl font-bold mb-4">Fitness Center for All Levels</h2>
            <p className="text-lg mb-6">Join our fitness community and achieve your health goals with expert trainers and a welcoming environment.</p>
            <button 
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              onClick={() => window.location.href = '/classes'}
            >
              Explore Classes
            </button>
          </div>
        </div>
        
        {/* Slide 2 */}
        <div className="relative">
          <img 
            src="https://i.ibb.co.com/PCM6cJ2/smart-watch-technology-with-sport-fitness-tracker-advertising-poster-website-banner-realistic-design.jpg" 
            className="w-full h-96 object-cover"
            alt="Smart Fitness Tracker"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
            <h2 className="text-3xl font-bold mb-4">Track Your Progress</h2>
            <p className="text-lg mb-6">Monitor your fitness progress with smart tracking devices and personalized insights.</p>
            <button 
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              onClick={() => window.location.href = '/classes'}
            >
              Explore Classes
            </button>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative">
          <img 
            src="https://i.ibb.co.com/RSzN7YW/premium-photo-1670505062582-fdaa83c23c9e.jpg" 
            className="w-full h-96 object-cover"
            alt="Fitness Gym"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
            <h2 className="text-3xl font-bold mb-4">Achieve Your Goals</h2>
            <p className="text-lg mb-6">Stay motivated and focused with our top-tier fitness programs.</p>
            <button 
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              onClick={() => window.location.href = '/classes'}
            >
              Explore Classes
            </button>
          </div>
        </div>

        {/* Slide 4 */}
        <div className="relative">
          <img 
            src="https://i.ibb.co.com/RQnQnXp/DALL-E-2025-01-14-00-29-35-A-dynamic-and-vibrant-fitness-themed-banner-image-for-a-website-showcasin.webp" 
            className="w-full h-96 object-cover"
            alt="Dynamic Fitness Tracker"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
            <h2 className="text-3xl font-bold mb-4">Fitness on Your Terms</h2>
            <p className="text-lg mb-6">Experience fitness that adapts to your schedule and needs.</p>
            <button 
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              onClick={() => window.location.href = '/classes'}
            >
              Explore Classes
            </button>
          </div>
        </div>

        {/* Slide 5 */}
        <div className="relative">
          <img 
            src="https://i.ibb.co.com/9pK85PR/DALL-E-2025-01-14-00-31-16-A-vibrant-and-dynamic-fitness-tracker-website-banner-image-featuring-an-a.webp" 
            className="w-full h-96 object-cover"
            alt="Fitness Tracker"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
            <h2 className="text-3xl font-bold mb-4">Stay on Track</h2>
            <p className="text-lg mb-6">Achieve your fitness goals with precision tracking and personalized workouts.</p>
            <button 
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              onClick={() => window.location.href = '/classes'}
            >
              Explore Classes
            </button>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
