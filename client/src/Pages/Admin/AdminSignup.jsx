import { useState } from "react";
import image from "../../assets/HeroImage3.jpg";

const AdminSignup = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  // Function to check password strength
  const checkPasswordStrength = (value) => {
    let strength = 0;
    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[^A-Za-z0-9]/.test(value)) strength++;

    switch (strength) {
      case 0:
      case 1:
        setPasswordStrength("Weak");
        break;
      case 2:
        setPasswordStrength("Fair");
        break;
      case 3:
        setPasswordStrength("Good");
        break;
      case 4:
        setPasswordStrength("Strong");
        break;
      default:
        setPasswordStrength("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    checkPasswordStrength(value);
  };

  return (
    <div className="flex h-[700px] w-full">
      {/* left Side Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4">
        {!isSignUp ? (
          /* -------------------- SIGN IN -------------------- */
          <form className="md:w-96 w-80 flex flex-col items-center justify-center">
            <h2 className="text-4xl text-gray-900 font-medium">Sign In</h2>
            <p className="text-sm text-gray-500/90 mt-3">
              Welcome back! Please sign in to continue.
            </p>

            {/* Email Input */}
            <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-8">
              <svg
                width="16"
                height="11"
                viewBox="0 0 16 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg
                width="13"
                height="17"
                viewBox="0 0 13 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="w-full flex items-center justify-end mt-8 text-gray-500/80">
              <a className="text-sm underline" href="#">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-8 w-full h-11 rounded-full text-white bg-blue-500 hover:opacity-90 transition-opacity"
            >
              Login
            </button>

            {/* Navigate to Sign Up */}
            <p className="text-gray-500/90 text-sm mt-4">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-blue-400 hover:underline"
              >
                Sign up
              </button>
            </p>
          </form>
        ) : (
          /* -------------------- SIGN UP -------------------- */
          <form className="md:w-96 w-80 flex flex-col items-center justify-center">
            <h2 className="text-4xl text-gray-900 font-medium">
              Create Account
            </h2>
            <p className="text-sm text-gray-500/90 mt-3">
              Fill in your details to get started.
            </p>

            {/* Username */}
            <div className="flex items-center w-full mt-8 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
              <input
                type="text"
                placeholder="Username"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            {/* Email */}
            <div className="flex items-center w-full mt-6 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col items-start w-full mt-6">
              <div className="flex items-center bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 w-full">
                <input
                  type="password"
                  placeholder="Password"
                  className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              {password && (
                <p
                  className={`text-sm mt-2 ${
                    passwordStrength === "Weak"
                      ? "text-red-500"
                      : passwordStrength === "Fair"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  Password strength: {passwordStrength}
                </p>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="mt-8 cursor-pointer w-full h-11 rounded-full text-white bg-blue-500 hover:opacity-90 transition-opacity"
            >
              Sign Up
            </button>

            {/* Navigate Back to Sign In */}
            <p className="text-gray-500/90 text-sm mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                Sign in
              </button>
            </p>
          </form>
        )}
      </div>

      {/* Left Side Image */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 0, 58, 0.7), rgba(10, 0, 58, 0.7)), url(${image})`,
        }}
      ></div>
    </div>
  );
};

export default AdminSignup;
