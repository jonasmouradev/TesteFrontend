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
  thumbnail: Thumbnail;
}

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 16;

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
      <div>
        <h1 className="py-4 pb-10 text-4xl font-semibold">Personagens</h1>
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 rounded border border-gray-400 p-2"
        placeholder='"Spider-Man"'
      />
      <div className="grid grid-cols-1 gap-4 pb-10 pt-10 sm:grid-cols-2 md:grid-cols-4">
        {characters.map((character) => (
          <div key={character.id} className="rounded-lg border border-gray-300">
            <Image
              width={500}
              height={500}
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              className="h-96 w-full"
            />
            <h2 className="mb-1 mt-2 p-4 text-lg font-semibold">
              {character.name}
            </h2>
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
