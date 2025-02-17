import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
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
            src="https://i.ibb.co/BPWscpq/fitness-center-banner-design-template-23-2150017348.jpg" 
            className="w-full h-[500px] object-cover"
            alt="Fitness Center Banner 1"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-3xl font-bold mb-4">Fitness Center for All Levels</h2>
            <p className="text-lg mb-6">Join our fitness community and achieve your health goals with expert trainers and a welcoming environment.</p>
            
          </div>
        </div>
        
        {/* Slide 2 */}
        <div className="relative">
          <img 
            src="https://i.ibb.co/PCM6cJ2/smart-watch-technology-with-sport-fitness-tracker-advertising-poster-website-banner-realistic-design.jpg" 
            className="w-full h-[500px] object-cover"
            alt="Smart Fitness Tracker"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div> 
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-3xl font-bold mb-4">Track Your Progress</h2>
            <p className="text-lg mb-6">Monitor your fitness progress with smart tracking devices and personalized insights.</p>
           
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative">
          <img 
            src="https://i.ibb.co/9pK85PR/DALL-E-2025-01-14-00-31-16-A-vibrant-and-dynamic-fitness-tracker-website-banner-image-featuring-an-a.webp" 
            className="w-full h-[500px] object-cover"
            alt="Fitness Gym"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div> 
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-3xl font-bold mb-4">Achieve Your Goals</h2>
            <p className="text-lg mb-6">Stay motivated and focused with our top-tier fitness programs.</p>
           
          </div>
        </div>

        {/* Slide 4 */}
        <div className="relative">
          <img 
            src="https://i.ibb.co/RQnQnXp/DALL-E-2025-01-14-00-29-35-A-dynamic-and-vibrant-fitness-themed-banner-image-for-a-website-showcasin.webp" 
            className="w-full h-[500px] object-cover"
            alt="Dynamic Fitness Tracker"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div> 
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-3xl font-bold mb-4">Fitness on Your Terms</h2>
            <p className="text-lg mb-6">Experience fitness that adapts to your schedule and needs.</p>
           
          </div>
        </div>

        {/* Slide 5 */}
        <div className="relative">
          <img 
            src="https://i.ibb.co/RSzN7YW/premium-photo-1670505062582-fdaa83c23c9e.jpg" 
            className="w-full h-[500px] object-cover"
            alt="Fitness Tracker"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div> 
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-3xl font-bold mb-4">Stay on Track</h2>
            <p className="text-lg mb-6">Achieve your fitness goals with precision tracking and personalized workouts.</p>
           
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
