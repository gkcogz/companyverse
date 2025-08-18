// src/components/CompanyCard.tsx
import Link from 'next/link';
import Image from 'next/image';

export type Company = {
  id: number;
  name: string;
  slug: string;
  country: string | null;
  logo_url?: string | null;
  category?: string | null;
}

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <Link 
      href={`/companies/${company.slug}`}
      className="block bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 group"
    >
      <div className="flex items-center space-x-4">
        {company.logo_url ? (
          <Image
            src={company.logo_url}
            alt={`${company.name} logo`}
            width={64}
            height={64}
            className="rounded-full object-contain bg-white p-1 border border-gray-200"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500 group-hover:text-blue-500 transition-colors">
            {company.name.charAt(0)}
          </div>
        )}
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{company.name}</h3>
          <p className="text-gray-500">{company.country}</p>
        </div>
      </div>
    </Link>
  );
};

export default CompanyCard;