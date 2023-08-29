import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h4 className="text-2xl mb-2">Oops! Halaman yang Anda cari tidak ditemukan.</h4>
      <p className="text-lg mb-4">
        Maaf, kami tidak dapat menemukan halaman yang Anda cari. Silakan periksa URL atau kembali ke halaman beranda.
      </p>
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFoundPage;
