import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditFilmForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        judul: '',
        poster: null,
        deskripsi: '',
        trailer: '',
        rating: '',
        tanggal_rilis: '',
        genres: [],
    });
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        async function fetchFilmData() {
            try {
                const response = await fetch(`http://localhost:8080/api/film/get-film/${id}`);
                const data = await response.json();
                setFormData({
                    judul: data.Response.judul || '',
                    poster: data.Response.poster || null,
                    deskripsi: data.Response.deskripsi || '',
                    trailer: data.Response.trailer || '',
                    rating: data.Response.rating || '',
                    tanggal_rilis: data.Response.tanggal_rilis || '',
                    genres: data.Response.Genres.map(genre => genre.ID) || [],
                });
            } catch (error) {
                console.error('Error fetching film data:', error);
            }
        }
        fetchFilmData();
    }, [id]);

    useEffect(() => {
        async function fetchGenres() {
            try {
                const response = await fetch('http://localhost:8080/api/genre/get-genre');
                const data = await response.json();
                setGenres(data.Response);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        }
        fetchGenres();
    }, []);

    const handleGenreChange = (genreId) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            genres: prevFormData.genres.includes(genreId)
                ? prevFormData.genres.filter(id => id !== genreId)
                : [...prevFormData.genres, genreId],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = new FormData();
        postData.append('judul', formData.judul);
        postData.append('poster', formData.poster);
        postData.append('deskripsi', formData.deskripsi);
        postData.append('trailer', formData.trailer);
        postData.append('rating', formData.rating);
        postData.append('tanggal_rilis', new Date(formData.tanggal_rilis).toISOString());

        formData.genres.map(angka => {
            console.log(angka);
            postData.append('genres', angka);
        })

        try {
            const response = await fetch(`http://localhost:8080/api/film/update-film/${id}`, {
                method: 'PUT',
                body: postData,
            });
            const data = await response.json();
            console.log('Film update successfully:', data);
            alert("Film berhasil di update")
        } catch (error) {
            console.error('Error updating film:', error);
        }

        // <Navigate to={"/film"}/>
    };

    return (
        <div className="container mx-auto py-10 overflow-y-scroll">
            <form onSubmit={handleSubmit} className='w-[500px] m-auto flex flex-col gap-5 p-5 bg-slate-300 rounded-xl'>
                {/* ... (your form fields) ... */}
                <h1 className='text-2xl font-bold'>Edit Film</h1>
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
                        onChange={(e) => {
                            console.log(e.target.files[0]);
                            setFormData({ ...formData, poster: e.target.files[0] })
                        }}
                    // defaultValue={movie?.poster}
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
                    // defaultValue={movie?.deskripsi}
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
                    // defaultValue={movie?.trailer}
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
                    // defaultValue={movie?.rating}
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
                    // defaultValue={movie?.tanggal_rilis}
                    />
                </div>
                <div>
                    <label className="block font-bold mb-2">Genre</label>
                    <div className="flex flex-wrap">
                        {genres.map(genre => (
                            <label key={genre.ID} className="mr-4 mb-2">
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={formData.genres.includes(genre.ID)}
                                    onChange={() => handleGenreChange(genre.ID)}
                                />
                                {genre.nama}
                            </label>
                        ))}
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Edit Film
                </button>
            </form>
        </div>
    );
};

export default EditFilmForm;

