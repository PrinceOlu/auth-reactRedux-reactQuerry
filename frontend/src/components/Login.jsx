import React from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/userService";
import AlertMessage from "./AlertMessage";
import { loginAction } from "../redux/slices/authSlice";

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  // Mutation
  const mutation = useMutation({
    mutationFn: loginAPI,
    mutationKey: ['login'],  // Fixed typo
  });
const navigate = useNavigate()
  // Dispatch
  const dispatch = useDispatch();

  // Handle form using formik
  const formik = useFormik({
    initialValues: {
      email: "thomas@gmail.com",
      password: "12345",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      mutation.mutateAsync(values)
        .then((data) => {
          // Dispatch the login action
          dispatch(loginAction(data));
          // Save user data in localStorage
          localStorage.setItem("userInfo", JSON.stringify(data));
           // redirect the user to login page
           navigate("/profile")
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            New here?
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Display alert message */}
        {mutation.isLoading && <AlertMessage type="loading" message="Loading, please wait..." />}
        {mutation.isSuccess && <AlertMessage type="success" message="Login successful!" />}
        {mutation.isError && <AlertMessage type="error" message="Wrong credentials, please try again." />}

        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Email address"
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
