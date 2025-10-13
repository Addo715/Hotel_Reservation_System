// // import { useState } from "react"
// // import { useNavigate } from "react-router-dom"
// // import api from "../api/axios"
// // import image from "../assets/HeroImage1.jpg"

// // const UserSignup = () => {
// //     const [isSignUp, setIsSignUp] = useState(true)
// //     const [formData, setFormData] = useState({ email: "", password: "", first_name: "", last_name: "" })
// //     const [passwordStrength, setPasswordStrength] = useState("")
// //     const [message, setMessage] = useState("")
// //     const [loading, setLoading] = useState(false)
// //     const navigate = useNavigate()

// //     const checkPasswordStrength = (value) => {
// //         let strength = 0
// //         if (value.length >= 8) strength++
// //         if (/[A-Z]/.test(value)) strength++
// //         if (/[0-9]/.test(value)) strength++
// //         if (/[^A-Za-z0-9]/.test(value)) strength++

// //         switch (strength) {
// //             case 1: setPasswordStrength("Weak"); break
// //             case 2: setPasswordStrength("Fair"); break
// //             case 3: setPasswordStrength("Good"); break
// //             case 4: setPasswordStrength("Strong"); break
// //             default: setPasswordStrength("")
// //         }
// //     }

// //     const handleChange = (e) => {
// //         const { name, value } = e.target
// //         setFormData({ ...formData, [name]: value })
// //         if (name === "password") checkPasswordStrength(value)
// //     }

// //     const handleSubmit = async (e) => {
// //         e.preventDefault()
// //         setLoading(true)
// //         setMessage("")

// //         try {
// //             if (isSignUp) {
// //                 // REGISTER USER
// //                 await api.post("register/", formData)
// //                 setMessage("Account created successfully! You can now sign in.")
// //                 setIsSignUp(false)
// //             } else {
// //                 // LOGIN USER
// //                 const res = await api.post("login/", {
// //                     email: formData.email,
// //                     password: formData.password,
// //                 })

// //                 const { access, refresh, user } = res.data

// //                 // ✅ Store tokens and user info
// //                 localStorage.setItem("access", access)
// //                 localStorage.setItem("refresh", refresh)
// //                 localStorage.setItem("user", JSON.stringify(user))

// //                 setMessage("Login successful!")

// //                 // ✅ Redirect based on role
// //                 if (user.isAdmin) {
// //                     navigate("/admin")
// //                 } else {
// //                     navigate("/rooms")
// //                 }
// //             }
// //         } catch (error) {
// //             console.error(error.response?.data)
// //             setMessage("Something went wrong. Please try again.")
// //         } finally {
// //             setLoading(false)
// //         }
// //     }

// //     return (
// //         <div className="flex h-[700px] w-full">
// //             <div
// //                 className="hidden md:block w-1/2 bg-cover bg-center"
// //                 style={{
// //                     backgroundImage: `linear-gradient(rgba(10, 0, 58, 0.7), rgba(10, 0, 58, 0.7)), url(${image})`,
// //                 }}
// //             ></div>

// //             <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4">
// //                 <form onSubmit={handleSubmit} className="md:w-96 w-80 flex flex-col items-center justify-center">
// //                     <h2 className="text-4xl text-gray-900 font-medium">
// //                         {isSignUp ? "Create Account" : "Sign In"}
// //                     </h2>
// //                     <p className="text-sm text-gray-500/90 mt-3">
// //                         {isSignUp
// //                             ? "Fill in your details to get started."
// //                             : "Welcome back! Please sign in to continue."}
// //                     </p>

// //                     {isSignUp && (
// //                         <>
// //                             <div className="flex items-center w-full mt-8 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
// //                                 <input
// //                                     type="text"
// //                                     name="first_name"
// //                                     placeholder="First Name"
// //                                     onChange={handleChange}
// //                                     className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
// //                                     required
// //                                 />
// //                             </div>

// //                             <div className="flex items-center w-full mt-4 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
// //                                 <input
// //                                     type="text"
// //                                     name="last_name"
// //                                     placeholder="Last Name"
// //                                     onChange={handleChange}
// //                                     className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
// //                                     required
// //                                 />
// //                             </div>
// //                         </>
// //                     )}

// //                     <div className="flex items-center w-full mt-6 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
// //                         <input
// //                             type="email"
// //                             name="email"
// //                             placeholder="Email"
// //                             onChange={handleChange}
// //                             className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
// //                             required
// //                         />
// //                     </div>

// //                     <div className="flex flex-col items-start w-full mt-6">
// //                         <div className="flex items-center bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 w-full">
// //                             <input
// //                                 type="password"
// //                                 name="password"
// //                                 placeholder="Password"
// //                                 onChange={handleChange}
// //                                 className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
// //                                 required
// //                             />
// //                         </div>

// //                         {isSignUp && formData.password && (
// //                             <p
// //                                 className={`text-sm mt-2 ${
// //                                     passwordStrength === "Weak"
// //                                         ? "text-red-500"
// //                                         : passwordStrength === "Fair"
// //                                             ? "text-yellow-500"
// //                                             : "text-green-500"
// //                                 }`}
// //                             >
// //                                 Password strength: {passwordStrength}
// //                             </p>
// //                         )}
// //                     </div>

// //                     <button
// //                         type="submit"
// //                         disabled={loading}
// //                         className="mt-8 w-full h-11 rounded-full text-white bg-blue-500 hover:opacity-90 transition-opacity disabled:opacity-50"
// //                     >
// //                         {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
// //                     </button>

// //                     {message && <p className="text-center mt-4 text-gray-600">{message}</p>}

// //                     <p className="text-gray-500/90 text-sm mt-4">
// //                         {isSignUp ? (
// //                             <>
// //                                 Already have an account?{" "}
// //                                 <button
// //                                     type="button"
// //                                     onClick={() => setIsSignUp(false)}
// //                                     className="text-blue-400 hover:underline cursor-pointer"
// //                                 >
// //                                     Sign in
// //                                 </button>
// //                             </>
// //                         ) : (
// //                             <>
// //                                 Don't have an account?{" "}
// //                                 <button
// //                                     type="button"
// //                                     onClick={() => setIsSignUp(true)}
// //                                     className="text-blue-400 hover:underline cursor-pointer"
// //                                 >
// //                                     Sign up
// //                                 </button>
// //                             </>
// //                         )}
// //                     </p>
// //                 </form>
// //             </div>
// //         </div>
// //     )
// // }

// // export default UserSignup


// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import api from "../api/axios"
// import image from "../assets/HeroImage1.jpg"

// const UserSignup = () => {
//     const [isSignUp, setIsSignUp] = useState(true)
//     const [formData, setFormData] = useState({ email: "", password: "", first_name: "", last_name: "" })
//     const [passwordStrength, setPasswordStrength] = useState("")
//     const [message, setMessage] = useState("")
//     const [loading, setLoading] = useState(false)
//     const navigate = useNavigate()

//     const checkPasswordStrength = (value) => {
//         let strength = 0
//         if (value.length >= 8) strength++
//         if (/[A-Z]/.test(value)) strength++
//         if (/[0-9]/.test(value)) strength++
//         if (/[^A-Za-z0-9]/.test(value)) strength++

//         switch (strength) {
//             case 1: setPasswordStrength("Weak"); break
//             case 2: setPasswordStrength("Fair"); break
//             case 3: setPasswordStrength("Good"); break
//             case 4: setPasswordStrength("Strong"); break
//             default: setPasswordStrength("")
//         }
//     }

//     const handleChange = (e) => {
//         const { name, value } = e.target
//         setFormData({ ...formData, [name]: value })
//         if (name === "password") checkPasswordStrength(value)
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         setLoading(true)
//         setMessage("")

//         try {
//             if (isSignUp) {
//                 // REGISTER USER
//                 await api.post("register/", formData)
//                 setMessage("Account created successfully! You can now sign in.")
//                 setIsSignUp(false)
//             } else {
//                 // LOGIN USER
//                 const res = await api.post("login/", {
//                     email: formData.email,
//                     password: formData.password,
//                 })

//                 const { access, refresh, user } = res.data

//                 // ✅ Store tokens and user info
//                 localStorage.setItem("access", access)
//                 localStorage.setItem("refresh", refresh)
//                 localStorage.setItem("user", JSON.stringify(user))

//                 setMessage("Login successful!")

//                 // ✅ Redirect based on role
//                 if (user.isAdmin) {
//                     navigate("/admin")
//                 } else {
//                     navigate("/")
//                 }
//             }
//         } catch (error) {
//             console.error(error.response?.data)
//             setMessage("Something went wrong. Please try again.")
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div className="flex h-[700px] w-full">
//             <div
//                 className="hidden md:block w-1/2 bg-cover bg-center"
//                 style={{
//                     backgroundImage: `linear-gradient(rgba(10, 0, 58, 0.7), rgba(10, 0, 58, 0.7)), url(${image})`,
//                 }}
//             ></div>

//             <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4">
//                 <form onSubmit={handleSubmit} className="md:w-96 w-80 flex flex-col items-center justify-center">
//                     <h2 className="text-4xl text-gray-900 font-medium">
//                         {isSignUp ? "Create Account" : "Sign In"}
//                     </h2>
//                     <p className="text-sm text-gray-500/90 mt-3">
//                         {isSignUp
//                             ? "Fill in your details to get started."
//                             : "Welcome back! Please sign in to continue."}
//                     </p>

//                     {isSignUp && (
//                         <>
//                             <div className="flex items-center w-full mt-8 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
//                                 <input
//                                     type="text"
//                                     name="first_name"
//                                     placeholder="First Name"
//                                     onChange={handleChange}
//                                     className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
//                                     required
//                                 />
//                             </div>

//                             <div className="flex items-center w-full mt-4 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
//                                 <input
//                                     type="text"
//                                     name="last_name"
//                                     placeholder="Last Name"
//                                     onChange={handleChange}
//                                     className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
//                                     required
//                                 />
//                             </div>
//                         </>
//                     )}

//                     <div className="flex items-center w-full mt-6 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             onChange={handleChange}
//                             className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
//                             required
//                         />
//                     </div>

//                     <div className="flex flex-col items-start w-full mt-6">
//                         <div className="flex items-center bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 w-full">
//                             <input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Password"
//                                 onChange={handleChange}
//                                 className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
//                                 required
//                             />
//                         </div>

//                         {isSignUp && formData.password && (
//                             <p
//                                 className={`text-sm mt-2 ${
//                                     passwordStrength === "Weak"
//                                         ? "text-red-500"
//                                         : passwordStrength === "Fair"
//                                             ? "text-yellow-500"
//                                             : "text-green-500"
//                                 }`}
//                             >
//                                 Password strength: {passwordStrength}
//                             </p>
//                         )}
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="mt-8 w-full h-11 rounded-full text-white bg-blue-500 hover:opacity-90 transition-opacity disabled:opacity-50"
//                     >
//                         {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
//                     </button>

//                     {message && <p className="text-center mt-4 text-gray-600">{message}</p>}

//                     <p className="text-gray-500/90 text-sm mt-4">
//                         {isSignUp ? (
//                             <>
//                                 Already have an account?{" "}
//                                 <button
//                                     type="button"
//                                     onClick={() => setIsSignUp(false)}
//                                     className="text-blue-400 hover:underline cursor-pointer"
//                                 >
//                                     Sign in
//                                 </button>
//                             </>
//                         ) : (
//                             <>
//                                 Don't have an account?{" "}
//                                 <button
//                                     type="button"
//                                     onClick={() => setIsSignUp(true)}
//                                     className="text-blue-400 hover:underline cursor-pointer"
//                                 >
//                                     Sign up
//                                 </button>
//                             </>
//                         )}
//                     </p>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default UserSignup


import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import image from "../assets/HeroImage1.jpg"

const UserSignup = () => {
    const [isSignUp, setIsSignUp] = useState(true)
    const [formData, setFormData] = useState({ email: "", password: "", first_name: "", last_name: "" })
    const [passwordStrength, setPasswordStrength] = useState("")
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [passwordRequirements, setPasswordRequirements] = useState({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false
    })
    const navigate = useNavigate()

    const checkPasswordStrength = (value) => {
        // Check individual requirements
        const requirements = {
            minLength: value.length >= 8,
            hasUpperCase: /[A-Z]/.test(value),
            hasLowerCase: /[a-z]/.test(value),
            hasNumber: /[0-9]/.test(value),
            hasSpecialChar: /[^A-Za-z0-9]/.test(value)
        }
        setPasswordRequirements(requirements)

        // Calculate strength
        let strength = 0
        if (requirements.minLength) strength++
        if (requirements.hasUpperCase) strength++
        if (requirements.hasLowerCase) strength++
        if (requirements.hasNumber) strength++
        if (requirements.hasSpecialChar) strength++

        switch (strength) {
            case 1:
            case 2: setPasswordStrength("Weak"); break
            case 3: setPasswordStrength("Fair"); break
            case 4: setPasswordStrength("Good"); break
            case 5: setPasswordStrength("Strong"); break
            default: setPasswordStrength("")
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        if (name === "password") checkPasswordStrength(value)
    }

    // Check if password meets all requirements
    const isPasswordValid = () => {
        return Object.values(passwordRequirements).every(req => req === true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        try {
            if (isSignUp) {
                // Validate password before registering
                if (!isPasswordValid()) {
                    setMessage("Password does not meet all requirements. Please check below.")
                    setLoading(false)
                    return
                }

                // REGISTER USER
                await api.post("register/", formData)
                setMessage("Account created successfully! You can now sign in.")
                setIsSignUp(false)
            } else {
                // LOGIN USER
                const res = await api.post("login/", {
                    email: formData.email,
                    password: formData.password,
                })

                const { access, refresh, user } = res.data

                // ✅ Store tokens and user info
                localStorage.setItem("access", access)
                localStorage.setItem("refresh", refresh)
                localStorage.setItem("user", JSON.stringify(user))

                setMessage("Login successful!")

                // ✅ Trigger a storage event to update navbar
                window.dispatchEvent(new Event("storage"))

                // ✅ Redirect based on role
                setTimeout(() => {
                    if (user.isAdmin) {
                        navigate("/admin")
                    } else {
                        navigate("/")
                    }
                }, 500)
            }
        } catch (error) {
            console.error(error.response?.data)
            setMessage("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex h-[700px] w-full">
            <div
                className="hidden md:block w-1/2 bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(10, 0, 58, 0.7), rgba(10, 0, 58, 0.7)), url(${image})`,
                }}
            ></div>

            <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4">
                <form onSubmit={handleSubmit} className="md:w-96 w-80 flex flex-col items-center justify-center">
                    <h2 className="text-4xl text-gray-900 font-medium">
                        {isSignUp ? "Create Account" : "Sign In"}
                    </h2>
                    <p className="text-sm text-gray-500/90 mt-3">
                        {isSignUp
                            ? "Fill in your details to get started."
                            : "Welcome back! Please sign in to continue."}
                    </p>

                    {isSignUp && (
                        <>
                            <div className="flex items-center w-full mt-8 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
                                    required
                                />
                            </div>

                            <div className="flex items-center w-full mt-4 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
                                <input
                                    type="text"
                                    name="last_name"
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                    className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className="flex items-center w-full mt-6 bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
                            required
                        />
                    </div>

                    <div className="flex flex-col items-start w-full mt-6">
                        <div className="flex items-center bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 w-full">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                className="bg-transparent text-gray-500/80 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>

                        {isSignUp && formData.password && (
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

                    <button
                        type="submit"
                        disabled={loading || (isSignUp && formData.password && !isPasswordValid())}
                        className="mt-8 w-full h-11 rounded-full text-white bg-blue-500 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
                    </button>

                    {message && <p className="text-center mt-4 text-gray-600">{message}</p>}

                    <p className="text-gray-500/90 text-sm mt-4">
                        {isSignUp ? (
                            <>
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => setIsSignUp(false)}
                                    className="text-blue-400 hover:underline cursor-pointer"
                                >
                                    Sign in
                                </button>
                            </>
                        ) : (
                            <>
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => setIsSignUp(true)}
                                    className="text-blue-400 hover:underline cursor-pointer"
                                >
                                    Sign up
                                </button>
                            </>
                        )}
                    </p>
                </form>
            </div>
        </div>
    )
}

export default UserSignup