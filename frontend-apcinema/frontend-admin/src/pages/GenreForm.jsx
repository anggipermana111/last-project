import React, { useState, useEffect } from 'react';

const GenreForm = () => {
  const [formData, setFormData] = useState({
    nama: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!confirm("Apakah anda yakin untuk menambah Genre Baru?")) {
      return;
    }

    const postData = {
      nama: formData.nama,
    };

    try {
      const response = await fetch('http://localhost:8080/api/genre/add-genre', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      console.log('Genre added successfully:', data);
      setFormData({
        nama: '',
      });
      alert("Tambah Genre Berhasil!");
    } catch (error) {
      alert("Tambah Genre Gagal!");
      console.error('Error adding genre:', error);
    } 
    finally {
      window.location.href = "/genre"; // Redirect to genre list page
    }
  };

  return (
    <div className="container mx-auto py-10 overflow-y-scroll">
      <form onSubmit={handleSubmit} className='w-[500px] m-auto flex flex-col gap-5 p-5 bg-slate-300 rounded-xl'>
        <h1 className='text-2xl font-bold'>Tambah Genre</h1>
        <div>
          <label htmlFor="nama" className="block font-bold mb-2">Nama Genre</label>
          <input
            type="text"
            id="nama"
            placeholder='nama genre'
            className="border rounded px-2 py-1 w-full"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Tambah Genre
        </button>
      </form>
    </div>
  );
};

export default GenreForm;
