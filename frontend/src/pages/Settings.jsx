// function Settings() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold">Settings</h1>
//     </div>
//   );
// }

// export default Settings;

import { useState } from "react";

const Settings = () => {
  const [profile, setProfile] = useState("");

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const handleProfileChange = (e) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswords((prev) => ({ ...prev, [id]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Saved:", profile);
    // TODO: connect with backend
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password Change:", passwords);
    // TODO: connect with backend
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>
      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg max-w-2xl mx-auto space-y-8">
        {/* Profile Settings */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-300 border-b border-gray-300 dark:border-gray-700 pb-2">
            Profile
          </h3>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 dark:text-gray-400 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                onChange={handleProfileChange}
                className="w-full bg-gray-200 dark:bg-gray-700 p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 dark:text-gray-400 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="abc@gmail.com"
                onChange={handleProfileChange}
                className="w-full bg-gray-200 dark:bg-gray-700 p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>

        {/* Security Settings */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-300 border-b border-gray-300 dark:border-gray-700 pb-2">
            Security
          </h3>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="current"
                className="block text-gray-700 dark:text-gray-400 mb-2"
              >
                Current Password
              </label>
              <input
                type="password"
                id="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                className="w-full bg-gray-200 dark:bg-gray-700 p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label
                htmlFor="newPass"
                className="block text-gray-700 dark:text-gray-400 mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPass"
                value={passwords.newPass}
                onChange={handlePasswordChange}
                className="w-full bg-gray-200 dark:bg-gray-700 p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirm"
                className="block text-gray-700 dark:text-gray-400 mb-2"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                className="w-full bg-gray-200 dark:bg-gray-700 p-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
