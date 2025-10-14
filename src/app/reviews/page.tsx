import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Company Reviews - CompanyVerse",
  description:
    "Read real applicant reviews and experiences with top companies — Veeva, McKinsey, and more.",
};

export default function ReviewsPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Company
            <span className="ml-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Reviews
            </span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            Real applicant stories and hiring process reviews.
          </p>
        </div>

        {/* Review Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {/* Veeva */}
          <Link
            href="/reviews/veeva"
            className="group block rounded-xl border border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-200 p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-indigo-600">
                Veeva
              </h2>
              <Image
                src="/images/veeva-logo.png"
                alt="Veeva Systems Logo"
                width={40}
                height={40}
                className="rounded"
              />
            </div>
            <p className="mt-3 text-gray-600 text-base">
              Insights from an applicant’s experience with Veeva’s hiring process.
            </p>
            <p className="mt-4 text-indigo-600 font-medium">Read review →</p>
          </Link>

          {/* McKinsey */}
          <Link
            href="/reviews/mckinsey"
            className="group block rounded-xl border border-gray-200 hover:border-indigo-400 hover:shadow-lg transition-all duration-200 p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-indigo-600">
                McKinsey
              </h2>
              <Image
                src="/images/mckinsey-logo.png"
                alt="McKinsey Logo"
                width={40}
                height={40}
                className="rounded"
              />
            </div>
            <p className="mt-3 text-gray-600 text-base">
              Candidate feedback on McKinsey’s application and interview process.
            </p>
            <p className="mt-4 text-indigo-600 font-medium">Read review →</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
