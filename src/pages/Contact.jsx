import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Simple validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" }); // Clear error on input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess("");
    } else {
      setErrors({});
      setSuccess("Your message has been sent successfully!");
      // Reset form
      setFormData({ name: "", email: "", phone: "", message: "" });
      // You can also send data to API here
    }
  };

  return (
    <div className="bg-white py-12 px-4 md:px-16">
      {/* Contact Info & Image */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start mb-12 gap-8">
        {/* Left: Contact Info */}
        <div className="flex-1 text-left">
          <h2 className="text-2xl font-bold mb-4 line-height: 2">For Online Orders</h2>
          <p className="text-gray-700 mb-2 text-2xl line-height: 2">
            Inquiry/Complaint <br />
            9976357250
          </p>
          <p className="text-gray-700 mb-2 text-2xl line-height: 2">
            Any other queries <br />
            9976357250 <br />
            9976357250 <br />
            10 AM - 7 PM
          </p>
          <p className="text-gray-700 text-2xl line-height: 2">
            Email:{" "}
            <a
              href="mailto:customercarestepup.in@gmail.com"
              className="underline text-blue-600"
            >
              customercarestepup.in@gmail.com
            </a>
          </p>
        </div>

        {/* Right: Image */}
        <div className="flex-1">
          <img
            src="/banners/ban4.jpg"
            alt="Shoes Display"
            className="w-full h-auto rounded-lg shadow-lg"
            style={{ height: "400px" }}
          />
        </div>
      </div>

      <hr className="border-gray-300 mb-12" />

      {/* Enquiry Form */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Enquiry Form</h2>
        {success && <p className="text-green-600 mb-4">{success}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block font-medium mb-2 text-xl">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email & Phone */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="email" className="block font-medium mb-2 text-xl">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="phone" className="block font-medium mb-2 text-xl">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block font-medium mb-2 text-xl">
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className={`w-full border ${
                errors.message ? "border-red-500" : "border-gray-300"
              } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500`}
              placeholder="Type your message here"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-700 text-white font-medium px-6 py-2 rounded-md hover:bg-green-800 transition text-xl"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
