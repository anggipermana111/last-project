import React, { useState } from 'react';

const AdminForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    nama: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!confirm("Apakah anda yakin untuk menambah Admin Baru?")) {
      return;
    }

    const postData = {
      email: formData.email,
      nama: formData.nama,
      password: formData.password,
    };

    try {
      const response = await fetch('http://localhost:8080/api/admin/add-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      console.log('Admin added successfully:', data);
      setFormData({
        email: '',
        nama: '',
        password: '',
      });
      alert("Tambah Admin Berhasil!");
    } catch (error) {
      alert("Tambah Admin Gagal!");
      console.error('Error adding admin:', error);
    } finally {
      window.location.href = "/admin"
    }
  };

  return (
    <div className="container mx-auto py-10 overflow-y-scroll">
      <form onSubmit={handleSubmit} className='w-[500px] m-auto flex flex-col gap-5 p-5 bg-slate-300 rounded-xl'>
        <h1 className='text-2xl font-bold'>Tambah Admin</h1>
        <div>
          <label htmlFor="email" className="block font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            placeholder='email'
            className="border rounded px-2 py-1 w-full"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="nama" className="block font-bold mb-2">Nama</label>
          <input
            type="text"
            id="nama"
            placeholder='nama'
            className="border rounded px-2 py-1 w-full"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            placeholder='password'
            className="border rounded px-2 py-1 w-full"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Tambah Admin
        </button>
      </form>
    </div>
  );
};

export default AdminForm;
