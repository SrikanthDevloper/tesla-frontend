
"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ContactUs = () => {
  const formik = useFormik({
    initialValues: {
      carModel: "",
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      carModel: Yup.string().required("Please select a car model"),
      name: Yup.string()
      .matches(/^[a-z,A-Z, ]+$/,"Name shout only contains alphabets")
        .min(3, "Must be at least 3 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Form Data:", values);
      alert("Form Submitted Successfully!");
      resetForm();
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-lg bg-zinc-900 text-white shadow-2xl rounded-2xl p-8 border border-zinc-800">
        <h2 className="text-3xl font-semibold text-center mb-8 tracking-wide">
          Contact Us
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-5">

          {/* Car Model Dropdown */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Car Model
            </label>
            <select
              name="carModel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.carModel}
              className="w-full bg-black border border-zinc-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="">Select a Model</option>
              <option value="Model S">Model S</option>
              <option value="Model 3">Model 3</option>
              <option value="Model X">Model X</option>
              <option value="Model Y">Model Y</option>
            </select>
            {formik.touched.carModel && formik.errors.carModel && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.carModel}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="w-full bg-black border border-zinc-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-500"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full bg-black border border-zinc-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-500"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter 10-digit phone number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="w-full bg-black border border-zinc-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-500"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-400 text-sm mt-1">
                {formik.errors.phone}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;