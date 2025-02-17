import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Success = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, 
      offset: 100,
      once: true,
    });
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-200 via-green-600 to-blue-900 py-16 mb-14 rounded-lg">
      <div className="container mx-auto text-center text-white px-6">
        <h2
          className="text-4xl font-extrabold mb-6"
          data-aos="fade-up"
        >
          Our Success
        </h2>
        <section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-lg font-semibold"
          data-aos="zoom-in"
        >
          <div className="flex flex-col items-center bg-blue-700 bg-opacity-50 p-6 rounded-lg shadow-lg">
            <h3 className="text-6xl font-bold">
              <CountUp end={180} />
              +
            </h3>
            <p className="mt-2">Artifacts Information</p>
          </div>
          <div className="flex flex-col items-center bg-blue-700 bg-opacity-50 p-6 rounded-lg shadow-lg">
            <h3 className="text-6xl font-bold">
              <CountUp end={1000} />
              +
            </h3>
            <p className="mt-2">Organizations Connected</p>
          </div>
          <div className="flex flex-col items-center bg-blue-700 bg-opacity-50 p-6 rounded-lg shadow-lg">
            <h3 className="text-6xl font-bold">
              <CountUp end={3.2} decimals={1} />
              M+
            </h3>
            <p className="mt-2">Members With Us</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Success;
