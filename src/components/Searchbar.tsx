// src/components/Searchbar.tsx
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link';
import { type Company } from './CompanyCard'; // Use the generic Company type

export default function Searchbar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const performSearch = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      
      const { data, error } = await supabase
        .from('companies') // "airlines" -> "companies"
        .select('id, name, slug, country')
        .ilike('name', `%${query}%`)
        .limit(5);

      if (error) {
        console.error('Search error:', error);
      } else if (data) {
        setResults(data);
      }
      setLoading(false);
    };

    const timeoutId = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, supabase]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a company..."
        className="w-full px-5 py-3 text-lg bg-white border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
      {query.length > 1 && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
          {loading && <div className="p-4 text-gray-500">Searching...</div>}
          {!loading && results.length > 0 && (
            <ul>
              {results.map((company) => (
                <li key={company.id}>
                  <Link 
                    href={`/companies/${company.slug}`} // "airlines" -> "companies"
                    className="block px-5 py-3 hover:bg-gray-100 text-gray-700 transition-colors"
                    onClick={() => setQuery('')}
                  >
                    {company.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {!loading && results.length === 0 && query.length > 1 && (
            <div className="p-4 text-gray-500">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}