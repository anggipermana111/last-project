import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    // Lakukan proses registrasi di sini
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-400">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 p-2 rounded"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium mb-1">Password</label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 p-2 rounded"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full border border-gray-300 p-2 rounded"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
        </div>
        <div className="mb-4">
          <ReCAPTCHA
            // sitekey="6LfLu9MnAAAAALgxf1SDJXQNtzmtGBf3iKxX_Tzj"
            sitekey="6Ld69sEnAAAAAOqLD_KL6s14uY6PrkIxnOAgWc_N"
            onChange={handleRecaptchaChange}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
