'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';
import Image from 'next/image';

interface Thumbnail {
  path: string;
  extension: string;
}

interface Series {
  id: number;
  title: string;
  description: string;
  thumbnail: Thumbnail;
}

export default function ComicsPage() {
  const [series, setSeries] = useState<Series[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 12;

  useEffect(() => {
    const publicKey = 'e9f43d1c48aff61868b136f48cdffb2a';
    const privateKey = '666a8274215dddb4ca817e40be3049af8b35410c';
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);
    const offset = (page - 1) * limit;

    axios
      .get(
        `https://gateway.marvel.com:443/v1/public/series?contains=comic&orderBy=title&apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=${limit}&offset=${offset}&titleStartsWith=${search}`,
      )
      .then((response) => {
        setSeries(response.data.data.results);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados', error);
      });
  }, [page, search]);

  return (
    <div>
      <div>
        <h1 className=" py-4 pb-10 text-4xl font-semibold">Séries</h1>
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 rounded border border-gray-400 p-2"
        placeholder='"X-Men"'
      />
      <div className="grid grid-cols-1 gap-4 pb-10 pt-10 sm:grid-cols-2 md:grid-cols-4">
        {series.map((serie) => (
          <div key={serie.id} className="rounded-lg border border-gray-300 ">
            <Image
              width={1000}
              height={1000}
              src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
              alt={serie.title}
              className="h-96 w-full"
            />
            <h2 className="mb-1 mt-2 p-4 text-lg font-semibold">
              {serie.title}
            </h2>
            <p className="p-4 text-sm text-gray-700">
              {serie.description
                ? serie.description.substring(0, 500)
                : 'No description available.'}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          className="mr-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Página Anterior
        </button>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Próxima Página
        </button>
      </div>
    </div>
  );
}
