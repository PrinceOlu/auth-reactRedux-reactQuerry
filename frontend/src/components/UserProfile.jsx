import { useQuery } from "@tanstack/react-query";
import React from "react";
import { profileAPI } from "../services/userService";
import { useSelector } from "react-redux";
import AlertMessage from "./AlertMessage";

const UserProfile = () => {
  // getting the token from the store
  const userData = useSelector((state) => state.auth.user);

  // Fetching the profile data with react-query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['profile'],
    queryFn: () => profileAPI(userData?.token),
    enabled: !!userData?.token, // Only run if the token is available
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-4">
      <div className="px-6 py-8 bg-gray-100 text-center">
        <div className="mb-4">
          {/* Display alert message */}
        {isLoading && <AlertMessage type="loading" message="Loading, please wait..." />}
        {isError && <AlertMessage type="error" message="Wrong credentials, please try again." />}

          <img
            className="rounded-full h-24 w-24 mx-auto border-2 border-gray-300"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {data?.user?.username || 'Username not available'}
        </h2>
        <p className="text-gray-700">
          {data?.user?.email || 'Email not available'}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
