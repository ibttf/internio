"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import config from "@/baseUrl";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleCreateEmail = async () => {
    try {
      const response = await fetch(`${config.baseUrl}/emails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="">
      <div className="text-2xl font-bold mb-5">
        Get email notifications with the latest job updates.
      </div>
      {!success && !error ? (
        <form
          className="inline-flex max-w-sm"
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateEmail();
          }}
        >
          <div className="flex flex-col sm:flex-row justify-center max-w-xs mx-auto sm:max-w-none">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-input py-1.5 w-full mb-2 sm:mb-0 sm:mr-2"
              placeholder="Your email"
              aria-label="Your email"
            />
            <button
              className="btn-sm text-white bg-indigo-500 hover:bg-indigo-600 shadow-sm whitespace-nowrap"
              type="submit"
            >
              Join Newsletter
            </button>
          </div>
        </form>
      ) : null}

      {/* Success message */}
      {success && (
        <p className="font-medium text-emerald-600 text-center sm:text-left mt-2 opacity-75 text-sm">
          Thanks for subscribing!
        </p>
      )}
      {/* Error message */}
      {error && (
        <p className="font-medium text-red-600 text-center sm:text-left mt-2 opacity-75 text-sm">
          Something went wrong. Please try again later.
        </p>
      )}

      {/* Unsubscribe Link */}
      <div className="mt-3 text-left">
        <Link href="/unsubscribe" className="text-sm text-gray-500">
          Click{" "}
          <span className="hover:text-blue-600 underline transition duration-150 ease-in-out">
            here
          </span>{" "}
          to unsubscribe
        </Link>
      </div>
    </div>
  );
}
