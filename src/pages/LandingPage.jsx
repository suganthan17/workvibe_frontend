// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />

      {/* Welcome Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Welcome to WorkVibe
          </h1>
          <p className="text-gray-600 mb-8 text-lg md:text-xl">
            Your gateway to the perfect job or the perfect candidate.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              to="/browse-jobs"
              className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              I’m seeking a job
            </Link>
            <Link
              to="/post-job"
              className="border border-blue-600 text-blue-600 font-semibold px-6 py-3 rounded hover:bg-blue-600 hover:text-white transition"
            >
              I want to post a job
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Why Choose WorkVibe?
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">
          <div className="flex-1 bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Job Matching</h3>
            <p className="text-gray-600">
              Find jobs that match your skills and preferences with smart recommendations.
            </p>
          </div>
          <div className="flex-1 bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Resume Builder</h3>
            <p className="text-gray-600">
              Create a professional resume in minutes using our easy-to-use builder.
            </p>
          </div>
          <div className="flex-1 bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Recruiter Access</h3>
            <p className="text-gray-600">
              Employers can post jobs and access a pool of qualified candidates.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6">
            Start Your Job Journey Today
          </h2>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
            <Link
              to="/browse-jobs"
              className="border border-white px-6 py-3 rounded hover:bg-white hover:text-blue-600 transition"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
