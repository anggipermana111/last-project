import { useScrollTrigger } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {MdOutlineAddCircle} from "react-icons/md"

const FoodTable = () => {

  const [foods, setFoods] = useState()

  useEffect(() => {
    fetch(`http://localhost:8080/api/food/get-food`)
      .then((response) => response.json())
      .then((data) => {
        setFoods(data.Response)
      });
  }, []);
  return (
    <div className="container mx-auto p-10 overflow-y-scroll">
      <div className='flex justify-between items-center'>
        <h1 className="text-2xl font-bold mb-4">Daftar Makanan</h1>
        <Link to="/add-food" className="bg-blue-500 text-white py-2 px-4 rounded float-right mb-4 flex gap-3 items-center">
            Tambah Makanan
            <MdOutlineAddCircle color='white' size={20}/>
        </Link>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Nama</th>
            <th className="py-2 px-4 border">Harga</th>
            <th className="py-2 px-4 border w-48">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {foods?.map((food, i) => (
            <tr className="hover:bg-gray-50" key={food.ID} >
              <td className="py-2 px-4 border text-center">{i + 1}</td>
              <td className="py-2 px-4 border">{food.nama}</td>
              <td className="py-2 px-4 border">{food.harga}</td>
              <td className="py-2 px-4 border flex justify-center gap-5">
              <Link to={`/update-food/${food.ID}`} className="bg-green-500 text-white py-1 rounded w-32 text-center">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodTable;
