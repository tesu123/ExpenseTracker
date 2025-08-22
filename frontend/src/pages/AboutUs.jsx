// // function AboutUs() {
// //   return (
// //     <div>
// //       <h1 className="text-2xl font-bold">About gd sdfUs</h1>
// //     </div>
// //   );
// // }

// // export default AboutUs;

// import { FaLinkedin, FaInstagram, FaEnvelope, FaGlobe } from "react-icons/fa";
// import AbhijitPic from "../assets/abhijit_pic.jpg";

// const AboutUs = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-6 transition-colors duration-500">
//       {/* About Section */}
//       <div className="max-w-4xl mx-auto text-center mb-16">
//         <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
//           About <span className="text-purple-600">ExpenseTrack</span>
//         </h1>
//         <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
//           ExpenseTrack is a smart expense management application designed to
//           help individuals and families take control of their finances. With an
//           easy-to-use interface and powerful tracking features, it allows you to
//           monitor your spending, set financial goals, and achieve financial
//           freedom with confidence.
//         </p>
//       </div>

//       {/* Developer Section */}
//       <div className="max-w-3xl mx-auto">
//         <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-12">
//           Meet the <span className="text-purple-600">Developer</span>
//         </h2>

//         <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition duration-300">
//           <img
//             src={AbhijitPic}
//             alt="Abhijit Rabidas"
//             className="w-40 h-40 object-cover rounded-full border-4 border-purple-600 shadow-md"
//           />
//           <h3 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
//             Abhijit Rabidas
//           </h3>
//           <p className="text-gray-500 dark:text-gray-400">
//             Full Stack Developer
//           </p>

//           {/* Email */}
//           <a
//             href="mailto:abhijit.rabidas.mca@gmail.com"
//             className="mt-2 text-sm text-purple-600 flex items-center gap-2 hover:underline"
//           >
//             <FaEnvelope /> abhijit.rabidas.mca@gmail.com
//           </a>

//           {/* Social Links */}
//           <div className="flex gap-6 mt-4 text-2xl text-gray-600 dark:text-gray-300">
//             <a
//               href="https://www.linkedin.com/in/abhijit-rabidas/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-blue-600"
//             >
//               <FaLinkedin />
//             </a>
//             <a
//               href="https://www.abhijitrabidas.live/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-green-500"
//             >
//               <FaGlobe />
//             </a>
//             <a
//               href="https://www.instagram.com/aj_das_01/"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="hover:text-pink-500"
//             >
//               <FaInstagram />
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;

import { FaLinkedin, FaInstagram, FaEnvelope, FaGlobe } from "react-icons/fa";
import AbhijitPic from "../assets/abhijit_pic.jpg";

const AboutUs = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-6 transition-colors duration-500 flex flex-col justify-center items-center">
      {/* About Section */}
      <div className="max-w-4xl text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
          About <span className="text-purple-600">ExpenseTrack</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          ExpenseTrack is a smart expense management application designed to
          help individuals and families take control of their finances. With an
          easy-to-use interface and powerful tracking features, it allows you to
          monitor your spending, set financial goals, and achieve financial
          freedom with confidence.
        </p>
      </div>

      {/* Developer Section */}
      <div className="max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          Meet the <span className="text-purple-600">Developer</span>
        </h2>

        <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:shadow-2xl transition duration-300">
          <img
            src={AbhijitPic}
            alt="Abhijit Rabidas"
            className="w-40 h-40 object-cover rounded-full border-4 border-purple-600 shadow-md"
          />
          <h3 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Abhijit Rabidas
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Full Stack Developer
          </p>

          {/* Email */}
          <a
            href="mailto:abhijit.rabidas.mca@gmail.com"
            className="mt-2 text-sm text-purple-600 flex items-center gap-2 hover:underline"
          >
            <FaEnvelope /> abhijit.rabidas.mca@gmail.com
          </a>

          {/* Social Links */}
          <div className="flex gap-6 mt-4 text-2xl text-gray-600 dark:text-gray-300">
            <a
              href="https://www.linkedin.com/in/abhijit-rabidas/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.abhijitrabidas.live/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500"
            >
              <FaGlobe />
            </a>
            <a
              href="https://www.instagram.com/aj_das_01/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
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
