import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { motion } from 'framer-motion';

const NewsLaterSubscriber = () => {
    const [subscribers, setSubscribers] = useState([]);
    const axiosSecure = UseAxiosSecure();
  
    useEffect(() => {
      // Fetch the list of all subscribers when the component mounts
      axiosSecure.get('/newsLatter')
        .then(res => {
          setSubscribers(res.data);
        })
        .catch(error => {
          console.error("Error fetching subscribers:", error);
        });
    }, []);
  
    return (
        <div>
            <section className="mx-auto py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-indigo-800 mb-8 text-center">
            All Newsletter Subscribers
          </h2>
          
          {/* Subscribers Table */}
          <motion.table
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-w-full overflow-x-scroll bg-white border border-gray-200 rounded-lg shadow-lg"
          >
            <thead>
              <tr>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Name</th>
                <th className="py-2 px-4 text-left font-medium text-gray-700">Email</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-4">{subscriber.name}</td>
                  <td className="py-3 px-4">{subscriber.email}</td>
                </tr>
              ))}
            </tbody>
          </motion.table>
          
        </div>

      </section>
      
        </div>
    );
};

export default NewsLaterSubscriber;