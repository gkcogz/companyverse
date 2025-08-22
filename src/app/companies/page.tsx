// src/app/companies/page.tsx
import { createClient } from '@/utils/supabase/server';
import CompanyCard from "@/components/CompanyCard";
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

export type Company = {
  id: number;
  name: string;
  slug: string;
  country: string | null;
  logo_url?: string | null;
  category?: string | null;
};

export default async function CompaniesPage() {
  const supabase = await createClient(); // Corrected: Added await

  const { data: companies, error } = await supabase
    .from("companies")
    .select("*")
    .returns<Company[]>();

  if (error) {
    console.error("Error fetching companies:", error);
    return <p className="text-red-500 text-center mt-40">Could not fetch companies.</p>
  }

  return (
    <main className="container mx-auto px-6 py-24 sm:py-32">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Back to Main Page
        </Link>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">All Companies</h1>
      
      {companies && companies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No companies found.</p>
      )}
    </main>
  );
}