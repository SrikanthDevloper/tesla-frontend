"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchFeaturedCars, nextSlide, prevSlide, setCurrentIndex } from '../../store/slices/dashboardSlice';

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const {
    featuredCars,
    loading,
    currentIndex,
    error,
  } = useAppSelector((state) => state.dashboard);

  // Auto slide
  useEffect(() => {
    if (featuredCars.length > 0) {
      const interval = setInterval(() => {
        dispatch(nextSlide());
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [featuredCars.length, dispatch]);

  // Fetch featured cars on component mount
  useEffect(() => {
    dispatch(fetchFeaturedCars());
  }, [dispatch]);

  const currentCar = featuredCars[currentIndex];

  return (
    <div className="w-full">
      {/* Carousel Section */}
      {loading ? (
        <div className="w-full h-[500px] bg-gray-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading featured cars...</div>
        </div>
      ) : error ? (
        <div className="w-full h-[500px] bg-red-900 flex items-center justify-center">
          <div className="text-white text-xl">Error: {error}</div>
        </div>
      ) : featuredCars.length === 0 ? (
        <div className="w-full h-[500px] bg-gray-900 flex items-center justify-center">
          <div className="text-white text-xl">No featured cars available</div>
        </div>
      ) : (
        <div
          className="relative w-full h-[500px] bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${currentCar.modelImg})` }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-start max-w-7xl mx-auto px-12 text-white">
            <h1 className="text-5xl font-bold mb-4">
              {currentCar.model}
            </h1>

            <p className="text-xl max-w-2xl mb-6">
              {currentCar.description}
            </p>

            <div className="text-3xl font-semibold mb-6">
              ₹ {currentCar.basePrice.toLocaleString()}
            </div>

            <button 
              onClick={() => router.push(`/products/${currentCar.id}`)}
              className="bg-red-600 px-6 py-3 rounded-md text-lg hover:bg-red-700 transition"
            >
              View Details
            </button>
          </div>
        </div>
      )}

      {/* Indicators */}
      {!loading && !error && featuredCars.length > 0 && (
        <div className="flex justify-center mt-6 gap-3">
          {featuredCars.map((_, index) => (
            <button
              key={index}
              onClick={() => dispatch(setCurrentIndex(index))}
              className={`w-3 h-3 rounded-full transition ${
                currentIndex === index
                  ? "bg-red-600"
                  : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose Tesla?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Lightning Fast</h3>
              <p className="text-gray-600">Experience breathtaking acceleration with our electric powertrain technology.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Eco Friendly</h3>
              <p className="text-gray-600">Zero emissions driving for a sustainable future without compromising performance.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Advanced Safety</h3>
              <p className="text-gray-600">Industry-leading safety features with Autopilot and advanced driver assistance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-12">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Tesla by the Numbers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">500K+</div>
              <div className="text-gray-400">Vehicles Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">40K+</div>
              <div className="text-gray-400">Superchargers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">1.5B+</div>
              <div className="text-gray-400">Miles Driven</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">99%</div>
              <div className="text-gray-400">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-12 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied Tesla owners and revolutionize your driving experience.
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => router.push('/products')}
              className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-red-700 transition"
            >
              Explore Models
            </button>
            <button 
              onClick={() => router.push('/contact')}
              className="bg-white text-red-600 border-2 border-red-600 px-8 py-3 rounded-lg text-lg hover:bg-red-50 transition"
            >
              Schedule Test Drive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}