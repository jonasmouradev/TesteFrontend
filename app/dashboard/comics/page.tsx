'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';
import Image from 'next/image';

interface Thumbnail {
  path: string;
  extension: string;
}

interface Comic {
  id: number;
  title: string;
  description: string;
  thumbnail: Thumbnail;
}

export default function ComicsPage() {
  const [comics, setComics] = useState<Comic[]>([]);
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
        `https://gateway.marvel.com:443/v1/public/comics?format=comic&apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=${limit}&offset=${offset}&titleStartsWith=${search}`,
      )
      .then((response) => {
        setComics(response.data.data.results);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados', error);
      });
  }, [page, search]);

  return (
    <div>
      <div>
        <h1 className="py-4 pb-10 font-sans text-4xl font-semibold">
          Quadrinhos
        </h1>
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 rounded border border-gray-400 p-2"
        placeholder='"Avengers"'
      />
      <div className="grid grid-cols-1 gap-4 pb-10 pt-10 sm:grid-cols-2 md:grid-cols-4">
        {comics.map((comic) => (
          <div key={comic.id} className="rounded-lg border border-gray-300 ">
            <Image
              width={1000}
              height={1000}
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              className="h-96 w-full"
            />
            <h2 className="mb-1 mt-2 p-4 text-lg  font-semibold">
              {comic.title}
            </h2>
            <p className="p-4 text-sm text-gray-700">
              {comic.description
                ? comic.description.substring(0, 500)
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
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 "
        >
          Próxima Página
        </button>
      </div>
    </div>
  );
}
