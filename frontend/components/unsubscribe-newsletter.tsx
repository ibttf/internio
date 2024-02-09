"use client";
import React, { useState } from "react";
import config from "@/baseUrl";

export default function UnsubscribeNewsletter() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  async function handleUnsubscribe(e: any) {
    e.preventDefault();
    try {
      const response = await fetch(`${config.baseUrl}/emails/${email}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  }

  return (
    <div className="">
      <div className="text-2xl font-bold mb-5">
        Enter your email below to unsubscribe.
      </div>
      <form className="inline-flex max-w-sm">
        <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-none">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-input py-1.5 w-full mb-2 sm:mb-0 sm:mr-2"
            placeholder={success ? "" : "Your email"}
            aria-label="Your email"
          />
          <button
            onClick={(e) => handleUnsubscribe(e)}
            className="btn-sm text-white bg-indigo-500 hover:bg-indigo-600 shadow-sm whitespace-nowrap"
          >
            Unsubscribe
          </button>
        </div>
        {/* Success message */}
        {success && (
          <p className="font-medium text-emerald-600 text-center sm:text-left sm:absolute mt-2 opacity-75 text-sm">
            Successfully Unsubscribed
          </p>
        )}
        {/* Error message */}
        {error && (
          <p className="font-medium text-red-600 text-center sm:text-left sm:absolute mt-2 opacity-75 text-sm">
            Failed to Unsubscribe
          </p>
        )}
      </form>
    </div>
  );
}
