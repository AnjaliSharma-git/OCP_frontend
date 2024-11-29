import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Corrected import

const SignupPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [role, setRole] = useState("client");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Clear counselor-related fields when role is not counselor
  useEffect(() => {
    if (role !== "counselor") {
      setSpecialization("");
      setExperience("");
      setAvailability([]);
    }
  }, [role]);

  // Toggle between login and register mode
  const handleToggleMode = () => setIsLoginMode(!isLoginMode);
  const handleRoleChange = (e) => setRole(e.target.value);
  const handleSpecializationChange = (e) => setSpecialization(e.target.value);
  const handleExperienceChange = (e) => setExperience(e.target.value);
  const handleAddAvailability = () => setAvailability([...availability, { date: "", startTime: "", endTime: "" }]);
  const handleAvailabilityChange = (index, field, value) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index][field] = value;
    setAvailability(updatedAvailability);
  };

  // Validate the form input fields
  const validateForm = (data) => {
    const validationErrors = {};

    if (!data.email) {
      validationErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      validationErrors.email = "Invalid email format.";
    }

    if (!data.password) {
      validationErrors.password = "Password is required.";
    }

    // Validate name, specialization, experience, and availability for counselors
    if (!isLoginMode) {
      if (!data.name && role !== "client") {
        validationErrors.name = "Name is required.";
      }

      if (role === "counselor") {
        if (!data.specialization) {
          validationErrors.specialization = "Specialization is required for counselors.";
        }
        if (!data.experience) {
          validationErrors.experience = "Experience is required for counselors.";
        }
        if (availability.length === 0) {
          validationErrors.availability = "At least one availability slot is required.";
        } else {
          availability.forEach((slot, index) => {
            if (!slot.date || !slot.startTime || !slot.endTime) {
              validationErrors[`availability-${index}`] = "All availability fields are required.";
            }
          });
        }
      }
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.role = role;
  
    if (role === "counselor") {
      data.specialization = specialization;
      data.experience = experience;
      data.availability = availability;
    }
  
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({}); // Clear any previous errors
  
    try {
      let endpoint;
      let response;
  
      if (isLoginMode) {
        const { email, password } = data;
        response = await axios.post(`http://localhost:5000/auth/login-${role}`, { email, password });
  
        if (response.data.token) {
          const token = response.data.token;
          sessionStorage.setItem("token", token);  // Store the full token initially
  
          try {
            const decodedToken = jwtDecode(token);
            sessionStorage.setItem("clientId", decodedToken.id);  // Store only the client ID
  
            // Navigate based on the role
            const homepage = role === "client" ? "/client-home" : "/counselor-home";
            navigate(homepage);
          } catch (err) {
            console.error("Error decoding token:", err);
            alert("Error decoding token. Please try again.");
            return;
          }
        } else {
          alert("No token received from the server.");
        }
      } else {
        endpoint = `http://localhost:5000/auth/register-${role}`;
        response = await axios.post(endpoint, data);
  
        if (response.data.token) {
          const token = response.data.token;
          sessionStorage.setItem("token", token);  // Store the full token initially
  
          try {
            const decodedToken = jwtDecode(token);
            sessionStorage.setItem("clientId", decodedToken.id);  // Store only the client ID
          } catch (err) {
            console.error("Error decoding token:", err);
            alert("Error decoding token. Please try again.");
            return;
          }
  
          alert(`${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`);
          navigate(role === "client" ? "/client-home" : "/counselor-home");
        } else {
          alert("No token received from the server.");
        }
      }
    } catch (error) {
      console.error("Error during submission:", error);
      alert(error.response?.data.message || error.message);
    }
  };
  

  return (
    <div className="bg-gradient-to-b from-pink-50 to-yellow-50 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-pink-500 mb-6">
          {isLoginMode ? "Login" : "Register"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role selection */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Are you a:</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="client"
                  checked={role === "client"}
                  onChange={handleRoleChange}
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
                  onChange={handleRoleChange}
                  className="mr-2"
                />
                Counselor
              </label>
            </div>
          </div>

          {/* Name input */}
          {!isLoginMode && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                className={`w-full border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          {/* Email and Password inputs */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className={`w-full border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              className={`w-full border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Counselor-specific fields */}
          {role === "counselor" && !isLoginMode && (
            <>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={specialization}
                  onChange={handleSpecializationChange}
                  className={`w-full border ${errors.specialization ? "border-red-500" : "border-gray-300"} rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200`}
                />
                {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Experience</label>
                <input
                  type="number"
                  name="experience"
                  value={experience}
                  onChange={handleExperienceChange}
                  className={`w-full border ${errors.experience ? "border-red-500" : "border-gray-300"} rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200`}
                />
                {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">Availability</label>
                {availability.map((slot, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="date"
                      value={slot.date}
                      onChange={(e) => handleAvailabilityChange(index, "date", e.target.value)}
                      className={`w-full border ${errors[`availability-${index}`] ? "border-red-500" : "border-gray-300"} rounded-lg p-2`}
                    />
                    <input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => handleAvailabilityChange(index, "startTime", e.target.value)}
                      className={`w-full border ${errors[`availability-${index}`] ? "border-red-500" : "border-gray-300"} rounded-lg p-2`}
                    />
                    <input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => handleAvailabilityChange(index, "endTime", e.target.value)}
                      className={`w-full border ${errors[`availability-${index}`] ? "border-red-500" : "border-gray-300"} rounded-lg p-2`}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddAvailability}
                  className="text-blue-500 hover:underline"
                >
                  Add availability
                </button>
                {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
              </div>
            </>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg font-medium"
          >
            {isLoginMode ? "Login" : "Register"}
          </button>
        </form>

        {/* Toggle between login and register */}
        <p className="text-center text-sm mt-4">
          {isLoginMode
            ? "Don't have an account? "
            : "Already have an account? "}
          <button onClick={handleToggleMode} className="text-pink-500 font-semibold">
            {isLoginMode ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
