import { useScrollTrigger } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ChairTable = () => {

    const [chairs, setChairs] = useState()

    useEffect(() => {
        fetch(`http://localhost:8080/api/chair/get-chair`)
            .then((response) => response.json())
            .then((data) => {
                setChairs(data.Response)
            });
    }, []);
    return (
        <div className="container mx-auto p-10 overflow-y-scroll">
            <div className='flex justify-start items-center'>
                <h1 className="text-2xl font-bold mb-4">Daftar Kursi Setiap Studio</h1>
            </div>
            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                    <th className="py-2 px-4 border">Id</th>
                        <th className="py-2 px-4 border">Kode</th>
                        <th className="py-2 px-4 border">Harga</th>
                        <th className="py-2 px-4 border w-32">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {chairs?.map((chair, i) => (
                        <tr className="hover:bg-gray-50" key={chair.kode} >
                            <td className="py-2 px-4 border text-center">{i + 1}</td>
                            <td className="py-2 px-4 border text-center">{chair.kode}</td>
                            <td className="py-2 px-4 border">{chair.harga}</td>
                            <td className='py-2 px-4 border'>
                                <Link to={`/update-kursi/${chair.kode}`} className="bg-green-500 text-white py-1 rounded px-10 text-center">Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ChairTable;
