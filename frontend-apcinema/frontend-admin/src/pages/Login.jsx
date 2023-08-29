import React, { useState } from 'react';
import { useContext } from 'react';
import { AllContext } from '../App';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setToken} = useContext(AllContext)
  const [user,setUser] = useState({
    email:'',
    password:''
  })

  const handleEmailChange = (event) => {
    setUser({...user, email: event.target.value})
    // setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setUser({...user, password: event.target.value})
    // setPassword(event.target.value);
  };

  // const response = await fetch(`http://localhost:8080/api/film/update-film/${id}`, {
  //               method: 'PUT',
  //               body: postData,
  //           });
  //           const data = await response.json();
  //           console.log('Film update successfully:', data);
  //           alert("Film berhasil di update")

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Lakukan proses login atau validasi di sini
    try {
      const response = await fetch("http://localhost:8080/api/admin/login",{
        method: "POST",
        body: JSON.stringify(user),
      })
      console.log(response);
      const data = await response.json()
      const token = data.Response.Token;
      console.log(token);
      setToken(token)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-400">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">Selamat Datang Admin!</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 p-2 rounded"
            value={user.email}
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
            value={user.password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
