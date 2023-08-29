import React, { useState, useEffect } from 'react';

const ScheduleForm = () => {
    const [films, setFilms] = useState([]);
    const [studios, setStudios] = useState([]);
    const [formData, setFormData] = useState({
        filmId: '',
        studioId: '',
        tanggalTayang: '',
        jam: '',
    });

    useEffect(() => {
        fetch('http://localhost:8080/api/film/get-film')
            .then(response => response.json())
            .then(data => {
                setFilms(data.Response);
            })
            .catch(error => {
                console.error('Error fetching films:', error);
            });

        fetch('http://localhost:8080/api/studio/get-studio')
            .then(response => response.json())
            .then(data => {
                setStudios(data.Response);
            })
            .catch(error => {
                console.error('Error fetching studios:', error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validasi tanggal
        const selectedDate = new Date(formData.tanggalTayang);
        const today = new Date();
        if (selectedDate <= today) {
            alert("Tanggal harus lebih dari hari ini");
            return;
        }

        if (!confirm("Apakah anda yakin untuk menambah Schedule Baru?")) {
            return;
        }

        const postData = {
            film_id: parseInt(formData.filmId),
            studio_id: parseInt(formData.studioId),
            tanggal: formData.tanggalTayang,
            jam: formData.jam,
        };

        try {
            const response = await fetch('http://localhost:8080/api/schedule/add-schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
            console.log(JSON.stringify(postData));
            const data = await response.json();
            console.log('Schedule added successfully:', data);
            setFormData({
                filmId: '',
                studioId: '',
                tanggalTayang: '',
                jam: '',
            });
            alert("Tambah Schedule Berhasil!");
        } catch (error) {
            alert("Tambah Schedule Gagal!");
            console.error('Error adding schedule:', error);
        } finally {
            // Add logic to handle redirection or any other action after adding schedule
        }
    };

    return (
        <div className="container mx-auto py-10 overflow-y-scroll">
            <form onSubmit={handleSubmit} className='w-[500px] m-auto flex flex-col gap-5 p-5 bg-slate-300 rounded-xl'>
                <h1 className='text-2xl font-bold'>Tambah Schedule</h1>
                <div>
                    <label htmlFor="filmId" className="block font-bold mb-2">Film</label>
                    <select
                        id="filmId"
                        className="border rounded px-2 py-1 w-full"
                        value={formData.filmId}
                        onChange={(e) => setFormData({ ...formData, filmId: e.target.value })}
                        required
                    >
                        <option value="" disabled>Pilih Film</option>
                        {films.map(film => (
                            <option key={film.ID} value={film.ID}>{film.judul}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="studioId" className="block font-bold mb-2">Studio</label>
                    <select
                        id="studioId"
                        className="border rounded px-2 py-1 w-full"
                        value={formData.studioId}
                        onChange={(e) => setFormData({ ...formData, studioId: e.target.value })}
                        required
                    >
                        <option value="" disabled>Pilih Studio</option>
                        {studios.map(studio => (
                            <option key={studio.ID} value={studio.ID}>{studio.nama}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="tanggalTayang" className="block font-bold mb-2">Tanggal Tayang</label>
                    <input
                        type="date"
                        id="tanggalTayang"
                        className="border rounded px-2 py-1 w-full"
                        value={formData.tanggalTayang}
                        onChange={(e) => setFormData({ ...formData, tanggalTayang: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="jam" className="block font-bold mb-2">Jam</label>
                    <select
                        id="jam"
                        className="border rounded px-2 py-1 w-full"
                        value={formData.jam}
                        onChange={(e) => setFormData({ ...formData, jam: e.target.value })}
                        required
                    >
                        <option value="" disabled>Pilih Jam</option>
                        <option value="10:30">10:30</option>
                        <option value="14:20">14:20</option>
                        <option value="20:00">20:00</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Tambah Schedule
                </button>
            </form>
        </div>
    );
};

export default ScheduleForm;
