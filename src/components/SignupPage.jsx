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
    availability: [{ date: "", startTime: "", endTime: "" }],
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "counselor") {
      setFormData((prev) => ({
        ...prev,
        specialization: "",
        experience: "",
        availability: [{ date: "", startTime: "", endTime: "" }],
      }));
    }
  }, [role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name && value !== undefined) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddAvailability = () => {
    setFormData((prev) => ({
      ...prev,
      availability: [
        ...prev.availability,
        { date: "", startTime: "", endTime: "" },
      ],
    }));
  };

  const handleAvailabilityChange = (index, field, value) => {
    const updatedAvailability = [...formData.availability];
    updatedAvailability[index][field] = value;
    setFormData((prev) => ({ ...prev, availability: updatedAvailability }));
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.email) {
      validationErrors.email = "Email is required.";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required.";
    }

    if (role === "counselor") {
      if (!formData.specialization) {
        validationErrors.specialization = "Specialization is required.";
      }

      if (!formData.experience) {
        validationErrors.experience = "Experience is required.";
      }

      if (!formData.availability || formData.availability.length === 0) {
        validationErrors.availability = "At least one availability slot is required.";
      } else {
        formData.availability.forEach((slot, index) => {
          if (!slot.date || !slot.startTime || !slot.endTime) {
            validationErrors[`availability_${index}`] =
              "All fields in availability are required.";
          }
        });
      }
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const endpoint = isLoginMode
        ? `https://ocp-backend-oman.onrender.com/auth/login-${role}`
        : `https://ocp-backend-oman.onrender.com/auth/register-${role}`;

      const response = await axios.post(endpoint, formData);

      if (response.data && response.data.message && response.data.token && response.data.user) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        const decodedToken = jwtDecode(token);
        sessionStorage.setItem("userId", decodedToken.id);

        setTimeout(() => {
          navigate(role === "client" ? "/client-home" : "/counselor-home");
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
                  onChange={(e) => setRole("client")}
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
                  onChange={(e) => setRole("counselor")}
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

              <h3 className="text-lg font-semibold mt-4">Availability</h3>
              {formData.availability.map((slot, index) => (
                <div key={index} className="flex items-center space-x-4 mb-2">
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">Date</label>
                    <input
                      type="date"
                      value={slot.date}
                      onChange={(e) => handleAvailabilityChange(index, "date", e.target.value)}
                      className="border rounded-lg p-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">Start Time</label>
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => handleAvailabilityChange(index, "startTime", e.target.value)}
                      className="border rounded-lg p-2 w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm mb-1">End Time</label>
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => handleAvailabilityChange(index, "endTime", e.target.value)}
                      className="border rounded-lg p-2 w-full"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddAvailability}
                className="text-blue-500 hover:text-blue-600 mt-2"
              >
                + Add Availability
              </button>
              {errors.availability && <p className="text-red-500 text-sm mt-2">{errors.availability}</p>}
            </>
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg font-medium"
          >
            {isLoginMode ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-pink-500 hover:text-pink-600 font-semibold"
          >
            {isLoginMode ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
