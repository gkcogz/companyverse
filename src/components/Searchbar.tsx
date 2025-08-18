// src/components/Searchbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link';
import { type Airline } from '@/app/airlines/page'; // Airline tipini import ediyoruz

export default function Searchbar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Airline[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const performSearch = async () => {
      if (query.length < 2) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      
      // Supabase'de arama yapıyoruz
      const { data, error } = await supabase
        .from('airlines')
        .select('id, name, slug, country')
        .ilike('name', `%${query}%`) // 'name' sütununda arama metnini içerenleri bul
        .limit(5); // Sonuçları ilk 5 ile sınırla

      if (error) {
        console.error('Search error:', error);
      } else {
        setResults(data);
      }
      setLoading(false);
    };

    // Kullanıcı yazmayı bıraktıktan bir süre sonra aramayı tetiklemek (debounce)
    const timeoutId = setTimeout(() => {
      performSearch();
    }, 300); // 300 milisaniye bekle

    return () => clearTimeout(timeoutId);
  }, [query, supabase]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a company..."
        className="w-full px-5 py-3 text-lg bg-gray-800/80 border border-gray-700 rounded-full text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
      />
      {/* Arama Sonuçları */}
      {query.length > 1 && (
        <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden">
          {loading && <div className="p-4 text-gray-400">Searching...</div>}
          {!loading && results.length > 0 && (
            <ul>
              {results.map((airline) => (
                <li key={airline.id}>
                  <Link 
                    href={`/airlines/${airline.slug}`} 
                    className="block px-5 py-3 hover:bg-blue-500/20 white transition-colors"
                    onClick={() => setQuery('')} // Tıkladıktan sonra arama kutusunu temizle
                  >
                    {airline.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!loading && results.length === 0 && query.length > 1 && (
            <div className="p-4 text-gray-400">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}