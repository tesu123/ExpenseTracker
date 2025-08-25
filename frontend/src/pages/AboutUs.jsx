import { FaLinkedin, FaInstagram, FaEnvelope, FaGlobe } from "react-icons/fa";
import AbhijitPic from "../assets/abhijit_pic.jpg";

const AboutUs = () => {
  return (
    <div className="min-h-screen py-10 px-6 transition-colors duration-500">
      {/* About Section */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
          About <span className="text-purple-600">Zuno</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
          <span className="font-semibold text-purple-600">Zuno</span> is an
          personal finance companion built to simplify money management. It
          empowers you to track your monthly expenses, monitor income, and set
          meaningful goals — all within a clean, intuitive interface. With Zuno,
          financial freedom feels effortless and achievable.
        </p>
      </div>

      {/* Developer Section */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-12">
          Meet the <span className="text-purple-600">Creator</span>
        </h2>

        <div className="p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 bg-white dark:bg-gray-800">
          <img
            src={AbhijitPic}
            alt="Abhijit Rabidas"
            className="w-36 h-36 object-cover rounded-full border-4 border-purple-600 shadow-md mx-auto"
          />
          <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-gray-200">
            Abhijit Rabidas
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Full Stack Developer
          </p>

          {/* Email */}
          <a
            href="mailto:abhijit.rabidas.mca@gmail.com"
            className="mt-3 inline-flex items-center gap-2 text-sm text-purple-600 hover:underline"
          >
            <FaEnvelope /> abhijit.rabidas.mca@gmail.com
          </a>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-6 text-2xl text-gray-600 dark:text-gray-300">
            <a
              href="https://www.linkedin.com/in/abhijit-rabidas/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.abhijitrabidas.live/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500 transition"
            >
              <FaGlobe />
            </a>
            <a
              href="https://www.instagram.com/aj_das_01/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
