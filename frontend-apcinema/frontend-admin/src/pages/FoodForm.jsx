import React, { useState } from 'react';

const FoodForm = () => {
  const [formData, setFormData] = useState({
    nama: '',
    harga: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!confirm("Apakah anda yakin untuk menambah Makanan Baru?")) {
      return;
    }

    const postData = {
      nama: formData.nama,
      harga: parseInt(formData.harga),
    };

    try {
      const response = await fetch('http://localhost:8080/api/food/add-food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      console.log('Food added successfully:', data);
      setFormData({
        nama: '',
        harga: '',
      });
      alert("Tambah Makanan Berhasil!");
    } catch (error) {
      alert("Tambah Makanan Gagal!");
      console.error('Error adding food:', error);
    } finally {
        window.location.href = "/food";
    }
  };

  return (
    <div className="container mx-auto py-10 overflow-y-scroll">
      <form onSubmit={handleSubmit} className='w-[500px] m-auto flex flex-col gap-5 p-5 bg-slate-300 rounded-xl'>
        <h1 className='text-2xl font-bold'>Tambah Makanan</h1>
        <div>
          <label htmlFor="nama" className="block font-bold mb-2">Nama Makanan</label>
          <input
            type="text"
            id="nama"
            placeholder='nama makanan'
            className="border rounded px-2 py-1 w-full"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="harga" className="block font-bold mb-2">Harga Makanan</label>
          <input
            type="number"
            id="harga"
            placeholder='harga makanan'
            className="border rounded px-2 py-1 w-full"
            value={formData.harga}
            onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Tambah Makanan
        </button>
      </form>
    </div>
  );
};

export default FoodForm;
