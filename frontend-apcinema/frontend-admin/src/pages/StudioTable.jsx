import { useScrollTrigger } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const StudioTable = () => {

  const [studios, setStudios] = useState()

  useEffect(() => {
    fetch(`http://localhost:8080/api/studio/get-studio`)
      .then((response) => response.json())
      .then((data) => {
        setStudios(data.Response)
      });
  }, []);
  return (
    <div className="container mx-auto p-10 overflow-y-scroll">
      <div className='flex justify-start items-center'>
        <h1 className="text-2xl font-bold mb-4">Daftar Studio</h1>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Nama</th>
          </tr>
        </thead>
        <tbody>
          {studios?.map((studio, i) => (
            <tr className="hover:bg-gray-50" key={studio.ID} >
              <td className="py-2 px-4 border text-center">{i + 1}</td>
              <td className="py-2 px-4 border">{studio.nama}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudioTable;
