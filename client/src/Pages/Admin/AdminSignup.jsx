// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import image from "../../assets/HeroImage3.jpg";

// const AdminSignup = () => {
//     const [isSignUp, setIsSignUp] = useState(true);
//     const [password, setPassword] = useState("");
//     const [passwordStrength, setPasswordStrength] = useState("");
//     const [email, setEmail] = useState("");
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const checkPasswordStrength = (value) => {
//         let strength = 0;
//         if (value.length >= 8) strength++;
//         if (/[A-Z]/.test(value)) strength++;
//         if (/[0-9]/.test(value)) strength++;
//         if (/[^A-Za-z0-9]/.test(value)) strength++;
//         switch (strength) {
//             case 0:
//             case 1:
//                 setPasswordStrength("Weak");
//                 break;
//             case 2:
//                 setPasswordStrength("Fair");
//                 break;
//             case 3:
//                 setPasswordStrength("Good");
//                 break;
//             case 4:
//                 setPasswordStrength("Strong");
//                 break;
//             default:
//                 setPasswordStrength("");
//         }
//     };

//     const handlePasswordChange = (e) => {
//         const value = e.target.value;
//         setPassword(value);
//         checkPasswordStrength(value);
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError("");

//         try {
//             const res = await axios.post("http://127.0.0.1:8000/api/accounts/login/", {
//                 email,
//                 password,
//             });

//             localStorage.setItem("access", res.data.access);
//             localStorage.setItem("refresh", res.data.refresh);
//             localStorage.setItem("user", JSON.stringify(res.data.user));

//             if (res.data.user.isAdmin) {
//                 navigate("/admin");
//             } else {
//                 navigate("/user-dashboard");
//             }
//         } catch (err) {
//             setError("Invalid email or password");
//         }
//     };

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         setError("");

//         try {
//             await axios.post("http://127.0.0.1:8000/api/accounts/register/", {
//                 email,
//                 first_name: firstName,
//                 last_name: lastName,
//                 password,
//             });
//             alert("Account created successfully! You can now log in.");
//             setIsSignUp(false);
//         } catch (err) {
//             setError("Signup failed. Try again.");
//         }
//     };

//     return (
//         <div className="flex h-[700px] w-full">
//             <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4">
//                 {!isSignUp ? (
//                     <form
//                         onSubmit={handleLogin}
//                         className="md:w-96 w-80 flex flex-col items-center justify-center"
//                     >
//                         <h2 className="text-4xl text-gray-900 font-medium">Sign In</h2>
//                         <p className="text-sm text-gray-500/90 mt-3">
//                             Welcome back! Please sign in to continue.
//                         </p>

//                         <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-8">
//                             <input
//                                 type="email"
//                                 placeholder="Email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
//                                 required
//                             />
//                         </div>

//                         <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
//                             <input
//                                 type="password"
//                                 placeholder="Password"
//                                 value={password}
//                                 onChange={handlePasswordChange}
//                                 className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
//                                 required
//                             />
//                         </div>

//                         {error && (
//                             <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
//                         )}

//                         <div className="w-full flex items-center justify-end mt-8 text-gray-500/80">
//                             <a className="text-sm underline" href="#">
//                                 Forgot password?
//                             </a>
//                         </div>

//                         <button
//                             type="submit"
//                             className="mt-8 w-full h-11 rounded-full text-white bg-blue-500 hover:opacity-90 transition-opacity"
//                         >
//                             Login
//                         </button>

//                         <p className="text-gray-500/90 text-sm mt-4">
//                             Don't have an account?{" "}
//                             <button
//                                 type="button"
//                                 onClick={() => setIsSignUp(true)}
//                                 className="text-blue-400 hover:underline"
//                             >
//                                 Sign up
//                             </button>
//                         </p>
//                     </form>
//                 ) : (
//                     <form
//                         onSubmit={handleSignup}
//                         className="md:w-96 w-80 flex flex-col items-center justify-center"
//                     >
//                         <h2 className="text-4xl text-gray-900 font-medium">
//                             Create Account
//                         </h2>
//                         <p className="text-sm text-gray-500/90 mt-3">
//                             Fill in your details to get started.
//                         </p>

//                         <div className="flex items-center w-full mt-8 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
//                             <input
//                                 type="text"
//                                 placeholder="First Name"
//                                 value={firstName}
//                                 onChange={(e) => setFirstName(e.target.value)}
//                                 className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
//                                 required
//                             />
//                         </div>

//                         <div className="flex items-center w-full mt-6 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
//                             <input
//                                 type="text"
//                                 placeholder="Last Name"
//                                 value={lastName}
//                                 onChange={(e) => setLastName(e.target.value)}
//                                 className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
//                                 required
//                             />
//                         </div>

//                         <div className="flex items-center w-full mt-6 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
//                             <input
//                                 type="email"
//                                 placeholder="Email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
//                                 required
//                             />
//                         </div>

//                         <div className="flex flex-col items-start w-full mt-6">
//                             <div className="flex items-center bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 w-full">
//                                 <input
//                                     type="password"
//                                     placeholder="Password"
//                                     value={password}
//                                     onChange={handlePasswordChange}
//                                     className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
//                                     required
//                                 />
//                             </div>

//                             {password && (
//                                 <p
//                                     className={`text-sm mt-2 ${
//                                         passwordStrength === "Weak"
//                                             ? "text-red-500"
//                                             : passwordStrength === "Fair"
//                                                 ? "text-yellow-500"
//                                                 : "text-green-500"
//                                     }`}
//                                 >
//                                     Password strength: {passwordStrength}
//                                 </p>
//                             )}
//                         </div>

//                         {error && (
//                             <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
//                         )}

//                         <button
//                             type="submit"
//                             className="mt-8 cursor-pointer w-full h-11 rounded-full text-white bg-blue-500 hover:opacity-90 transition-opacity"
//                         >
//                             Sign Up
//                         </button>

//                         <p className="text-gray-500/90 text-sm mt-4">
//                             Already have an account?{" "}
//                             <button
//                                 type="button"
//                                 onClick={() => setIsSignUp(false)}
//                                 className="text-blue-400 hover:underline cursor-pointer"
//                             >
//                                 Sign in
//                             </button>
//                         </p>
//                     </form>
//                 )}
//             </div>

//  {/* Addo  */}
 
//             <div
//                 className="hidden md:block w-1/2 bg-cover bg-center"
//                 style={{
//                     backgroundImage: `linear-gradient(rgba(10, 0, 58, 0.7), rgba(10, 0, 58, 0.7)), url(${image})`,
//                 }}
//             ></div>
//         </div>
//     );
// };

// export default AdminSignup;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../../assets/HeroImage3.jpg";

const AdminSignup = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [password, setPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [passwordRequirements, setPasswordRequirements] = useState({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false
    });
    const navigate = useNavigate();

    const checkPasswordStrength = (value) => {
        // Check individual requirements
        const requirements = {
            minLength: value.length >= 8,
            hasUpperCase: /[A-Z]/.test(value),
            hasLowerCase: /[a-z]/.test(value),
            hasNumber: /[0-9]/.test(value),
            hasSpecialChar: /[^A-Za-z0-9]/.test(value)
        };
        setPasswordRequirements(requirements);

        // Calculate strength
        let strength = 0;
        if (requirements.minLength) strength++;
        if (requirements.hasUpperCase) strength++;
        if (requirements.hasLowerCase) strength++;
        if (requirements.hasNumber) strength++;
        if (requirements.hasSpecialChar) strength++;

        switch (strength) {
            case 1:
            case 2:
                setPasswordStrength("Weak");
                break;
            case 3:
                setPasswordStrength("Fair");
                break;
            case 4:
                setPasswordStrength("Good");
                break;
            case 5:
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

    // Check if password meets all requirements
    const isPasswordValid = () => {
        return Object.values(passwordRequirements).every(req => req === true);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://127.0.0.1:8000/api/accounts/login/", {
                email,
                password,
            });

            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            // Trigger storage event to update navbar
            window.dispatchEvent(new Event("storage"));

            setTimeout(() => {
                if (res.data.user.isAdmin) {
                    navigate("/admin");
                } else {
                    navigate("/user-dashboard");
                }
            }, 500);
        } catch (err) {
            setError("Invalid email or password");
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        // Validate password before signup
        if (!isPasswordValid()) {
            setError("Password does not meet all requirements. Please check below.");
            return;
        }

        try {
            await axios.post("http://127.0.0.1:8000/api/accounts/register/", {
                email,
                first_name: firstName,
                last_name: lastName,
                password,
            });
            alert("Account created successfully! You can now log in.");
            setIsSignUp(false);
        } catch (err) {
            setError("Signup failed. Try again.");
        }
    };

    return (
        <div className="flex h-[700px] w-full">
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4">
                {!isSignUp ? (
                    <form
                        onSubmit={handleLogin}
                        className="md:w-96 w-80 flex flex-col items-center justify-center"
                    >
                        <h2 className="text-4xl text-gray-900 font-medium">Sign In</h2>
                        <p className="text-sm text-gray-500/90 mt-3">
                            Welcome back! Please sign in to continue.
                        </p>

                        <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-8">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>

                        <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
                        )}

                        <div className="w-full flex items-center justify-end mt-8 text-gray-500/80">
                            <a className="text-sm underline cursor-pointer" href="#">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="mt-8 w-full h-11 rounded-full text-white bg-blue-500 hover:opacity-90 transition-opacity cursor-pointer"
                        >
                            Login
                        </button>

                        <p className="text-gray-500/90 text-sm mt-4">
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsSignUp(true);
                                    setEmail("");
                                    setPassword("");
                                    setFirstName("");
                                    setLastName("");
                                    setError("");
                                    setPasswordStrength("");
                                }}
                                className="text-blue-400 hover:underline cursor-pointer"
                            >
                                Sign up
                            </button>
                        </p>
                    </form>
                ) : (
                    <form
                        onSubmit={handleSignup}
                        className="md:w-96 w-80 flex flex-col items-center justify-center"
                    >
                        <h2 className="text-4xl text-gray-900 font-medium">
                            Create Account
                        </h2>
                        <p className="text-sm text-gray-500/90 mt-3">
                            Fill in your details to get started.
                        </p>

                        <div className="flex items-center w-full mt-8 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>

                        <div className="flex items-center w-full mt-6 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>

                        <div className="flex items-center w-full mt-6 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>

                        <div className="flex flex-col items-start w-full mt-6">
                            <div className="flex items-center bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 w-full">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                                    required
                                />
                            </div>

                            {password && (
                                <>
                                    <p
                                        className={`text-sm mt-2 font-medium ${
                                            passwordStrength === "Weak"
                                                ? "text-red-500"
                                                : passwordStrength === "Fair"
                                                    ? "text-yellow-500"
                                                    : passwordStrength === "Good"
                                                        ? "text-blue-500"
                                                        : "text-green-500"
                                        }`}
                                    >
                                        Password strength: {passwordStrength}
                                    </p>

                                    {/* Password Requirements */}
                                    <div className="mt-3 w-full text-xs space-y-1">
                                        <p className="font-medium text-gray-700 mb-1">Password must contain:</p>
                                        
                                        <div className={`flex items-center gap-2 ${passwordRequirements.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                                            {passwordRequirements.minLength ? '✓' : '○'} At least 8 characters
                                        </div>
                                        
                                        <div className={`flex items-center gap-2 ${passwordRequirements.hasUpperCase ? 'text-green-600' : 'text-gray-500'}`}>
                                            {passwordRequirements.hasUpperCase ? '✓' : '○'} One uppercase letter (A-Z)
                                        </div>
                                        
                                        <div className={`flex items-center gap-2 ${passwordRequirements.hasLowerCase ? 'text-green-600' : 'text-gray-500'}`}>
                                            {passwordRequirements.hasLowerCase ? '✓' : '○'} One lowercase letter (a-z)
                                        </div>
                                        
                                        <div className={`flex items-center gap-2 ${passwordRequirements.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                                            {passwordRequirements.hasNumber ? '✓' : '○'} One number (0-9)
                                        </div>
                                        
                                        <div className={`flex items-center gap-2 ${passwordRequirements.hasSpecialChar ? 'text-green-600' : 'text-gray-500'}`}>
                                            {passwordRequirements.hasSpecialChar ? '✓' : '○'} One special character (!@#$%^&*)
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={password && !isPasswordValid()}
                            className="mt-8 cursor-pointer w-full h-11 rounded-full text-white bg-blue-500 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Sign Up
                        </button>

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

            {/* Image Side */}
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