'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';
import Image from 'next/image';

interface Thumbnail {
  path: string;
  extension: string;
}

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
}

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('a');
  const limit = 12;

  useEffect(() => {
    const publicKey = 'e9f43d1c48aff61868b136f48cdffb2a';
    const privateKey = '666a8274215dddb4ca817e40be3049af8b35410c';
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);
    const offset = (page - 1) * limit;

    axios
      .get(
        `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=${limit}&offset=${offset}&nameStartsWith=${search}`,
      )
      .then((response) => {
        setCharacters(response.data.data.results);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados', error);
      });
  }, [page, search]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 rounded border border-gray-300 p-2"
        placeholder="Search characters"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {characters.map((character) => (
          <div
            key={character.id}
            className="rounded-lg border border-gray-300 p-4"
          >
            <Image
              width={500}
              height={500}
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              className="h-auto w-full"
            />
            <h2 className="mb-1 mt-2 text-lg font-semibold">
              {character.name}
            </h2>
            <p className="text-sm text-gray-700">
              {character.description || 'No description available.'}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          className="mr-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
