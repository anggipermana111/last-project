import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const FilmForm = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [formData, setFormData] = useState({
    judul: '',
    poster: null,
    deskripsi: '',
    trailer: '',
    rating: '',
    tanggal_rilis: '',
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/genre/get-genre')
      .then(response => response.json())
      .then(data => {
        setGenres(data.Response);
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
      });
  }, []);

  const handleGenreChange = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, parseInt(genreId)]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!confirm("Apakah anda yakin untuk menambah Film Baru?")) {
      return
    }

    const postData = new FormData();
    postData.append('judul', formData.judul);
    postData.append('poster', formData.poster);
    postData.append('deskripsi', formData.deskripsi);
    postData.append('trailer', formData.trailer);
    postData.append('rating', formData.rating);
    postData.append('tanggal_rilis', new Date(formData.tanggal_rilis).toISOString());

    selectedGenres.map(angka => {
      postData.append('genres', angka);
    })

    if (selectedGenres.length <= 0) {
        alert("Pilih setidaknya 1 genre")
        return
    }

    try {
      const response = await fetch('http://localhost:8080/api/film/add-film', {
        method: 'POST',
        body: postData
      });
      const data = await response.json();
      console.log('Film added successfully:', data);
      setFormData({
        judul: '',
        poster: null,
        deskripsi: '',
        trailer: '',
        rating: '',
        tanggal_rilis: '',
      });
      setSelectedGenres([]);
      alert("Tambah Film Berhasil!");
    } catch (error) {
      alert("Tambah Film Gagal!");
      console.error('Error adding film:', error);
    } finally {
      window.location.href = "/film"
    }
  };

  return (
    <div className="container mx-auto py-10 overflow-y-scroll">
      <form onSubmit={handleSubmit} className='w-[500px] m-auto flex flex-col gap-5 p-5 bg-slate-300 rounded-xl'>
        <h1 className='text-2xl font-bold'>Tambah Film</h1>
        <div >
          <label htmlFor="judul" className="block font-bold mb-2">Judul</label>
          <input
            type="text"
            id="judul"
            placeholder='judul film'
            className="border rounded px-2 py-1 w-full"
            value={formData.judul}
            onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
            required
          />
        </div>
        <div >
          <label htmlFor="poster" className="block font-bold mb-2">Poster</label>
          <input
            type="file"
            id="poster"
            accept="image/*"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setFormData({ ...formData, poster: e.target.files[0] })
            }}
            required
          />
        </div>
        <div >
          <label htmlFor="deskripsi" className="block font-bold mb-2">Deskripsi</label>
          <textarea
            id="deskripsi"
            className="border rounded px-2 py-1 w-full"
            placeholder='deskripsi film'
            value={formData.deskripsi}
            onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
            required
          />
        </div>
        <div >
          <label htmlFor="trailer" className="block font-bold mb-2">Trailer</label>
          <input
            type="text"
            id="trailer"
            placeholder='trailer film (Link YouTube Embed)'
            className="border rounded px-2 py-1 w-full"
            value={formData.trailer}
            onChange={(e) => setFormData({ ...formData, trailer: e.target.value })}
            required
          />
        </div>
        <div >
          <label htmlFor="rating" className="block font-bold mb-2">Rating</label>
          <input
            type="number"
            id="rating"
            step="0.1"
            className="border rounded px-2 py-1 w-full"
            min={0}
            max={10}
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            required
          />
        </div>
        <div >
          <label htmlFor="tanggal_rilis" className="block font-bold mb-2">Tanggal Rilis</label>
          <input
            type="date"
            id="tanggal_rilis"
            placeholder='tanggal rilis'
            className="border rounded px-2 py-1 w-full"
            value={formData.tanggal_rilis}
            onChange={(e) => setFormData({ ...formData, tanggal_rilis: e.target.value })}
            required
          />
        </div>
        <div >
          <label className="block font-bold mb-2">Genre</label>
          <div className="flex flex-wrap">
            {genres.map(genre => (
              <label key={genre.ID} className="mr-4 mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedGenres.includes(genre.ID)}
                  onChange={() => handleGenreChange(genre.ID)}
                />
                {genre.nama}
              </label>
            ))}
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Tambah Film
        </button>
      </form>
    </div>
  );
};

export default FilmForm;
