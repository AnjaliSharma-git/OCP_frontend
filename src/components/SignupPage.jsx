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
    availability: {
      date: "",
      startTime: "",
      endTime: "",
    },
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "counselor") {
      setFormData((prev) => ({
        ...prev,
        specialization: "",
        experience: "",
        availability: {
          date: "",
          startTime: "",
          endTime: "",
        },
      }));
    }
  }, [role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("availability.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        availability: {
          ...prev.availability,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData || !formData.email) {
      validationErrors.email = "Email is required.";
    }

    if (!formData || !formData.password) {
      validationErrors.password = "Password is required.";
    }

    if (role === "counselor") {
      if (!formData || !formData.specialization) {
        validationErrors.specialization = "Specialization is required.";
      }

      if (!formData || !formData.experience) {
        validationErrors.experience = "Experience is required.";
      }

      if (!formData.availability.date || !formData.availability.startTime || !formData.availability.endTime) {
        validationErrors.availability = "Complete availability information is required.";
      }
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      const endpoint = isLoginMode
        ? `https://ocp-backend-oman.onrender.com/auth/login-${role}`
        : `https://ocp-backend-oman.onrender.com/auth/register-${role}`;

      const response = await axios.post(endpoint, formData);
      if (!response || !response.data) {
        throw new Error("Failed to receive response from server.");
      }

      const { message, token, user } = response.data;
      if (!message || !token || !user) {
        throw new Error("Failed to receive valid response from server.");
      }

      if (message.includes("logged in successfully")) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        const decodedToken = jwtDecode(token);
        if (!decodedToken || !decodedToken.id) {
          throw new Error("Failed to decode token.");
        }

        sessionStorage.setItem("userId", decodedToken.id);

        setTimeout(() => {
          if (role === "client") {
            navigate("/client-home");
          } else {
            navigate("/counselor-home");
          }
        }, 100);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="bg-gradient-to-b from-pink-50 to-yellow-50 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-pink-500 mb-6">
          {isLoginMode ? "Login" : "Register"}
        </h1>
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
                />
                Counselor
              </label>
            </div>
          </div>

          {!isLoginMode && role === "client" && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200`}
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
              className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200`}
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
              className={`w-full border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200`}
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
                  className={`w-full border ${errors.specialization ? "border-red-500" : "border-gray-300"} rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200`}
                />
                {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Experience</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className={`w-full border ${errors.experience ? "border-red-500" : "border-gray-300"} rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200`}
                />
                {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Availability</label>
                <div className="space-y-2">
                  <div>
                    <label className="block text-gray-600 text-sm">Date</label>
                    <input
                      type="date"
                      name="availability.date"
                      value={formData.availability.date}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm">Start Time</label>
                    <input
                      type="time"
                      name="availability.startTime"
                      value={formData.availability.startTime}
                      onChange={handleInputChange}
                      className="w-full
