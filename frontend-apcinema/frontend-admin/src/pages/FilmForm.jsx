import { useState, useEffect } from 'react';

const FilmForm = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [formData, setFormData] = useState({
    judul: '',
    poster: '',
    deskripsi: '',
    trailer: '',
    rating: '',
    tanggal_rilis: '',
  });

  useEffect(() => {
    // Fetch genres from the API
    fetch('http://localhost:8080/api/genre/get-genre')
      .then(response => response.json())
      .then(data => {
        setGenres(data.Response);
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
      });
  }, []);

  // const handleVideoChange = (e) => {
  //   const file = e.target.files[0];
  //   setFormData({ ...formData, videoFile: file });
  // };

  const handleGenreChange = (genreId) => {
    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter(id => id !== genreId));
    } else {
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData.poster.name);
    const postData = { 
      ...formData, 
      poster: formData.poster.name,
      genres: selectedGenres 
    };
    console.log(postData.poster);

    fetch('http://localhost:8080/api/film/add-film', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Film added successfully:', data);
        setFormData({
          judul: '',
          poster: '',
          deskripsi: '',
          trailer: '',
          rating: '',
          tanggal_rilis: '',
        });
        setSelectedGenres([]);
      })
      .catch(error => {
        console.error('Error adding film:', error);
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className='w-1/2 m-auto flex flex-col gap-5 p-5 bg-slate-300 rounded-xl'>
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
          />
        </div>
        <div >
          <label htmlFor="poster" className="block font-bold mb-2">Poster</label>
          <input
            type="file"
            id="poster"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, poster: e.target.files[0] })}
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
          />
        </div>
        <div >
          <label htmlFor="rating" className="block font-bold mb-2">Rating</label>
          <input
            type="number"
            id="rating"
            step="0.1"
            className="border rounded px-2 py-1 w-full"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
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
          />
        </div>
        {/* <div >
          <label htmlFor="videoFile" className="block font-bold mb-2">Upload Video</label>
          <input
            type="file"
            id="videoFile"
            accept="video/*"
            onChange={handleVideoChange}
            className="mb-2"
          />
          {formData.videoFile && (
            <p>File terpilih: {formData.videoFile.name}</p>
          )}
        </div> */}
        {/* <div >
          <label htmlFor="videoFile" className="block font-bold mb-2">Upload Video</label>
          <input
            type="text"
            id="videoFile"
            onChange={handleVideoChange}
            className="border rounded px-2 py-1 w-full"
            placeholder='masukkan link YouTube Embed Trailer'
          />
        </div> */}
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
