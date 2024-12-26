import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const SignupPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [role, setRole] = useState("client");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    availability: [],
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "counselor") {
      setFormData((prev) => ({
        ...prev,
        specialization: "",
        experience: "",
        availability: [],
      }));
    }
  }, [role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name && value !== undefined) {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear the specific error when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    // Always validate email and password
    if (!formData.email) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long.";
    }

    // Validation for registration mode and counselor role
    if (!isLoginMode) {
      if (!formData.name) {
        validationErrors.name = "Name is required.";
      }

      if (role === "counselor") {
        if (!formData.specialization) {
          validationErrors.specialization = "Specialization is required.";
        }

        if (!formData.experience) {
          validationErrors.experience = "Experience is required.";
        }
      }
    }

    return validationErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    const endpoint = isLoginMode
      ? `https://ocp-backend-oman.onrender.com/auth/login-${role}`
      : `https://ocp-backend-oman.onrender.com/auth/register-${role}`;

    console.log('Sending request to:', endpoint);
    console.log('With data:', { ...formData, password: '[REDACTED]' });

    const response = await axios.post(endpoint, formData);
    console.log('Server response:', response.data);

    const { token, user } = response.data;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const decodedToken = jwtDecode(token);
      if (decodedToken?.id) {
        sessionStorage.setItem("userId", decodedToken.id);
        
        // Show success message before navigation
        alert(response.data.message || 'Successfully authenticated!');
        
        if (role === "client") {
          navigate("/client-home");
        } else {
          navigate("/counselor-home");
        }
      }
    } else {
      throw new Error("No token received from server");
    }
  } catch (error) {
    console.error('Detailed error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
    
    setErrors({
      submit: error.response?.data?.message || "An error occurred. Please try again."
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="bg-gradient-to-b from-pink-50 to-yellow-50 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-pink-500 mb-6">
          {isLoginMode ? "Login" : "Register"}
        </h1>
        
        {errors.submit && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Are you a:</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="client"
                  checked={role === "client"}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                  disabled={isLoading}
                />
                Client
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="counselor"
                  checked={role === "counselor"}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                  disabled={isLoading}
                />
                Counselor
              </label>
            </div>
          </div>

          {!isLoginMode && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200`}
                disabled={isLoading}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200`}
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200`}
              disabled={isLoading}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {role === "counselor" && !isLoginMode && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className={`w-full border ${
                    errors.specialization ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200`}
                  disabled={isLoading}
                />
                {errors.specialization && (
                  <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Experience (years)</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className={`w-full border ${
                    errors.experience ? "border-red-500" : "border-gray-300"
                  } rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200`}
                  disabled={isLoading}
                />
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
                )}
              </div>
            </>
          )}

          <button
            type="submit"
            className={`w-full bg-pink-500 text-white py-2 px-4 rounded-lg font-medium ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : (isLoginMode ? 'Login' : 'Register')}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setErrors({});
            }}
            className="text-pink-500 hover:text-pink-600 font-semibold"
            disabled={isLoading}
          >
            {isLoginMode ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
