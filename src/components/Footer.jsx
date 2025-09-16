// src/components/Footer.jsx
import React from "react";
import { Instagram, Mail, Phone, MessageCircle, Facebook } from "lucide-react";

function Footer() {
  return (
<<<<<<< HEAD
    <div className="bg-gray-900 text-white p-12 mt-20">
      <h1 className="font-bold text-2xl mb-4">About WorkVibe</h1>
=======
    <div className="bg-gray-900 text-gray-100 p-12 mt-20">
      <h1 className="font-bold text-2xl mb-4 text-green-500">About WorkVibe</h1>
>>>>>>> 9ac492f (added auth)
      <div className="flex flex-col gap-5 font-mono">
        <p>
          WorkVibe is a professional job portal connecting job seekers with
          recruiters. Find your dream job or post jobs to reach qualified
          candidates easily and efficiently.
        </p>

        <p>
          Our mission is simple: make job hunting and hiring seamless and
          trustworthy. Every connection made through WorkVibe helps build a
          stronger professional community.
        </p>

        <p>
          We are committed to creating a platform where opportunities meet
          talent in a secure and user-friendly environment. 🚀
        </p>

<<<<<<< HEAD
        <h1 className="mt-10 text-2xl font-bold">Contact Us</h1>
=======
        <h1 className="mt-10 text-2xl font-bold text-green-500">Contact Us</h1>
>>>>>>> 9ac492f (added auth)
        <div className="flex gap-8 mt-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://facebook.com/"
<<<<<<< HEAD
            className="transform hover:scale-125 transition duration-300"
=======
            className="transform hover:scale-125 transition duration-300 text-white hover:text-green-500"
>>>>>>> 9ac492f (added auth)
          >
            <Facebook size={20} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://instagram.com/"
<<<<<<< HEAD
            className="transform hover:scale-125 transition duration-300"
=======
            className="transform hover:scale-125 transition duration-300 text-white hover:text-green-500"
>>>>>>> 9ac492f (added auth)
          >
            <Instagram size={20} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://wa.me/1234567890"
<<<<<<< HEAD
            className="transform hover:scale-125 transition duration-300"
=======
            className="transform hover:scale-125 transition duration-300 text-white hover:text-green-500"
>>>>>>> 9ac492f (added auth)
          >
            <MessageCircle size={20} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:info@workvibe.com"
<<<<<<< HEAD
            className="transform hover:scale-125 transition duration-300"
=======
            className="transform hover:scale-125 transition duration-300 text-white hover:text-green-500"
>>>>>>> 9ac492f (added auth)
          >
            <Mail size={20} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="tel:+911234567890"
<<<<<<< HEAD
            className="transform hover:scale-125 transition duration-300"
=======
            className="transform hover:scale-125 transition duration-300 text-white hover:text-green-500"
>>>>>>> 9ac492f (added auth)
          >
            <Phone size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
