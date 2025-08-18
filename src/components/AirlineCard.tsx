// src/components/AirlineCard.tsx
import Link from 'next/link';
import Image from 'next/image';

// Airline verisinin tipini belirliyoruz
export type Airline = {
  id: number;
  name: string;
  slug: string;
  country: string;
  logo_url?: string | null;
}

const AirlineCard = ({ airline }: { airline: Airline }): JSX.Element => {
  return (
    <Link 
      href={`/airlines/${airline.slug}`}
      className="block bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 group"
    >
      <div className="flex items-center space-x-4">
        {/* Logo Alanı: URL varsa resmi göster, yoksa baş harfi */}
        {airline.logo_url ? (
          <Image
            src={airline.logo_url}
            alt={`${airline.name} logo`}
            width={64} // w-16 = 64px
            height={64} // h-16 = 64px
            className="rounded-full object-contain bg-white p-1 border border-gray-200"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500 group-hover:text-blue-500 transition-colors">
            {airline.name.charAt(0)}
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{airline.name}</h3>
          <p className="text-gray-500">{airline.country}</p>
        </div>
      </div>
    </Link>
  );
};

export default AirlineCard;