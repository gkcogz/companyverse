// src/app/airlines/page.tsx
import { createClient } from '@/utils/supabase/server';
import AirlineCard from "@/components/AirlineCard";
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

// Supabase'den gelen veri için tip tanımı
export type Airline = {
  id: number;
  name: string;
  slug: string;
  country: string;
  logo_url?: string | null;
};

export default async function AirlinesPage() {
  const supabase = createClient();

  const { data: airlines, error } = await supabase
    .from("airlines")
    .select("*")
    .returns<Airline[]>();

  if (error) {
    console.error("Error fetching airlines:", error);
    return <p className="text-red-500 text-center mt-40">Could not fetch airlines.</p>
  }

  return (
    <main className="container mx-auto px-6 py-32">
      {/* Ana Sayfaya Geri Dön Linki */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-black transition-colors">
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Back to Main Page
        </Link>
      </div>

      <h1 className="text-4xl font-bold text-black mb-8">All Airlines</h1>
      
      {airlines && airlines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {airlines.map((airline) => (
            <AirlineCard key={airline.id} airline={airline} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No airlines found.</p>
      )}
    </main>
  );
}