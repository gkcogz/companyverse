import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Veeva Review - CompanyVerse',
  description: 'An honest applicant review of Veeva.',
};

export default function VeevaReviewPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Veeva
            <span className="ml-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Review
            </span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            An applicant’s perspective on Veeva’s hiring process.
          </p>
        </div>

        <div className="mt-16 space-y-12 text-lg leading-relaxed text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Initial Impressions
            </h2>
            <p>
              My interaction with Veeva began positively. A recruiter reached out,
              invited me to their introduction webinar, and I spent an hour engaging with
              their presentation and Q&amp;A. The company presented itself as
              applicant-friendly and values-driven, leaving me with a strong first impression.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              The Application Process
            </h2>
            <p>
              After graduation, I applied for a role and reconnected with the recruiter.
              Following weeks of waiting, we scheduled an interview. I prepared thoroughly,
              learning about the role and the company. The conversation covered standard
              topics: my motivation, work eligibility, willingness to relocate, and salary expectations.
              The recruiter closed by promising to follow up the next week.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Where It Fell Short
            </h2>
            <p>
              That follow-up never came. I reached out myself and eventually received
              a generic rejection email. After signals that I was a strong candidate,
              the silence and impersonal response left me with the impression that my
              time and effort were undervalued. What was frustrating was not the rejection itself,
              but the careless way the process was handled.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Final Thoughts
            </h2>
            <p>
              Companies that claim to be applicant-friendly must also demonstrate respect
              through transparent and timely communication. My experience with Veeva
              suggests a gap between the values they promote and the practices they follow.
              If I lead a company in the future, I want to ensure applicants receive
              timely feedback and that their time is treated with the value it deserves.
            </p>

            {/* Rating Section */}
            <div className="mt-8 flex items-center justify-center">
              <span className="text-yellow-400 text-2xl">★★☆☆☆</span>
              <span className="ml-3 text-gray-700">(2/5)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
