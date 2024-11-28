import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [role, setRole] = useState("client");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [availability, setAvailability] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Reset form fields when role changes
  useEffect(() => {
    if (role !== "counselor") {
      setSpecialization("");
      setExperience("");
      setAvailability([]);
    }
  }, [role]);

  const handleToggleMode = () => setIsLoginMode(!isLoginMode);
  const handleRoleChange = (e) => setRole(e.target.value);
  const handleSpecializationChange = (e) => setSpecialization(e.target.value);
  const handleExperienceChange = (e) => setExperience(e.target.value);
  const handleAddAvailability = () => setAvailability([...availability, { day: "", startTime: "", endTime: "" }]);
  const handleAvailabilityChange = (index, field, value) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index][field] = value;
    setAvailability(updatedAvailability);
  };

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

    if (!isLoginMode) {
      if (!data.name) {
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
            if (!slot.day || !slot.startTime || !slot.endTime) {
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
    setErrors({}); 
  
    try {
      let endpoint;
      let response;
  
      if (isLoginMode) {
        endpoint = `http://localhost:5000/auth/login-${role}`;
        response = await axios.post(endpoint, data);
        console.log("Login successful:", response.data);
  
        const homepage = role === "client" ? "/client-home" : "/counselor-home";
        navigate(homepage);
      } else {
        endpoint = `http://localhost:5000/auth/register-${role}`;
        response = await axios.post(endpoint, data);
        console.log(`${role} registered successfully:`, response.data);

        const homepage = role === "client" ? "/client-home" : "/counselor-home";

        alert(`${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`);
        navigate(homepage);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      console.error("Error details:", error.response?.data || error.message);
  
      if (error.response && error.response.data) {
        alert(error.response.data.message || "An unexpected error occurred.");
      } else {
        alert(error.message || "An unexpected error occurred.");
      }
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

          {!isLoginMode && role === "counselor" && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Select Specialization</label>
              <select
                name="specialization"
                value={specialization}
                onChange={handleSpecializationChange}
                className={`w-full border ${errors.specialization ? "border-red-500" : "border-gray-300"} rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200`}
              >
                <option value="">Select Specialization</option>
                <option value="mental_health">Mental Health</option>
                <option value="relationship_advice">Relationship Advice</option>
                <option value="career_counseling">Career Counseling</option>
              </select>
              {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>}
            </div>
          )}

          {!isLoginMode && role === "counselor" && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Experience</label>
              <input
                type="text"
                name="experience"
                value={experience}
                onChange={handleExperienceChange}
                className={`w-full border ${errors.experience ? "border-red-500" : "border-gray-300"} rounded-lg p-2 focus:outline-none focus:ring focus:ring-yellow-200`}
              />
              {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
            </div>
          )}

          {!isLoginMode && role === "counselor" && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">Availability</label>
              {availability.map((slot, index) => (
                <div key={index} className="flex space-x-4 mb-2">
                  <input
                    type="text"
                    placeholder="Day (e.g., Monday)"
                    value={slot.day}
                    onChange={(e) => handleAvailabilityChange(index, "day", e.target.value)}
                    className={`w-1/3 border ${errors[`availability-${index}`] ? "border-red-500" : "border-gray-300"} rounded-lg p-2`}
                  />
                  <input
                    type="time"
                    value={slot.startTime}
                    onChange={(e) => handleAvailabilityChange(index, "startTime", e.target.value)}
                    className={`w-1/3 border ${errors[`availability-${index}`] ? "border-red-500" : "border-gray-300"} rounded-lg p-2`}
                  />
                  <input
                    type="time"
                    value={slot.endTime}
                    onChange={(e) => handleAvailabilityChange(index, "endTime", e.target.value)}
                    className={`w-1/3 border ${errors[`availability-${index}`] ? "border-red-500" : "border-gray-300"} rounded-lg p-2`}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddAvailability}
                className="text-blue-500 text-sm mt-2"
              >
                Add Availability Slot
              </button>
              {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-600 transition"
          >
            {isLoginMode ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={handleToggleMode}
            className="text-pink-500 font-bold underline"
          >
            {isLoginMode ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
