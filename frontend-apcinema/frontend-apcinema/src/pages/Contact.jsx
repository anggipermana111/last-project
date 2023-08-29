import React from 'react';
import aboutImage from "../assets/man.png"

export default function Contact() {
  return (
    <div className="pt-20 px-10 flex flex-col gap-20 md:w-full md:grid md:grid-cols-2 md:p-20 md:gap-32 md:items-center md:pt-36">
      <img
        src={aboutImage}
        alt="About Us"
      />
      <form onSubmit={(e)=>{
        e.preventDefault()
        alert("Terimakasih atas masukkannya!")
        window.location.href = "/"
      }}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block  mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="w-full px-3 py-2 rounded-lg"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500  py-2 px-4 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </form>
    </div>
  );
};