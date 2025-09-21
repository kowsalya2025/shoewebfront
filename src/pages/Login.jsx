import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import Layout from "../components/Layout";
import { Eye, EyeOff } from "lucide-react"; // for password toggle icon


export default function AuthPage() {
  const { login, register } = useContext(AuthContext); // assuming register is implemented
  const [tab, setTab] = useState("login"); // login or register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    let success = false;
    if (tab === "login") {
      success = await login(email, password);
    } else {
      success = await register(email, password); // implement registration logic
    }
    setLoading(false);
    if (!success) setError("Something went wrong. Please try again.");
  };

  const handleGoogleLogin = () => {
    // Placeholder for Google OAuth logic
    alert("Google login clicked");
  };

  return (
    // <Layout>
      <div className="flex items-center justify-center bg-gray-100 px-4 h-screen w-screen">
        <div className="bg-white shadow-md rounded-lg max-w-md w-full p-6 sm:p-8">
          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 py-2 font-semibold text-center ${
                tab === "login" ? "bg-gray-800 text-white" : "bg-gray-200"
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => setTab("register")}
              className={`flex-1 py-2 font-semibold text-center ${
                tab === "register" ? "bg-gray-800 text-white" : "bg-gray-200"
              }`}
            >
              Register
            </button>
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Email id</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="border rounded p-2 w-full pr-10 focus:outline-none focus:ring-2 focus:ring-gray-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute right-2 top-2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </span>
              </div>
              {tab === "login" && (
                <p className="text-right text-red-500 text-sm mt-1 cursor-pointer hover:underline">
                  Forget Password?
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-gray-800 text-white w-full py-2 rounded mt-2 hover:bg-gray-900 transition"
              disabled={loading}
            >
              {loading ? "Processing..." : tab === "login" ? "Log In" : "Register"}
            </button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="mx-2 text-gray-500">Or</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="border w-full py-2 rounded flex justify-center items-center gap-2 hover:bg-gray-100 transition"
          >
            Continue with Google <span className="text-red-500">G</span>
          </button>

          <p className="text-center text-sm mt-4">
            {tab === "login"
              ? "Don’t have an account? "
              : "Already have an account? "}
            <span
              className="text-red-500 cursor-pointer hover:underline text-center"
              onClick={() => setTab(tab === "login" ? "register" : "login")}
            >
              {tab === "login" ? "Register" : "Log In"}
            </span>
          </p>
        </div>
      </div>
    // </Layout>
  );
} 


