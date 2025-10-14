import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'McKinsey Solve Game Review - CompanyVerse',
  description: "A candidate's perspective on the McKinsey Solve game and interview process.",
};

export default function McKinseyReviewPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            McKinsey Solve
            <span className="ml-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Review
            </span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            A candidate`s experience with the gamified assessment.
          </p>
        </div>

        <div className="mt-16 space-y-12 text-lg leading-relaxed text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              The Gamified Challenge: McKinsey Solve
            </h2>
            <p>
              McKinsey`s approach to assessing candidates is unique, relying on a gamified
              assessment called `Solve` instead of traditional cover letters. My journey began
              with this interactive challenge, designed to test problem-solving and strategic
              thinking skills in a simulated environment. The experience is intriguing, as it
              measures how you think, not necessarily what you know about business.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              The Solve Game Experience (Trial)
            </h2>
            <p>
              The assessment included several mini-games. Below are placeholders for
              screenshots from two of the games I played and video recordings of the solutions. 
              (Note: For legal reasons, these are for trial purposes and will not be published).
            </p>
            
            {/* Placeholder for Screenshots */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">[Placeholder for Game 1 Screenshot]</p>
              </div>
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-500">[Placeholder for Game 2 Screenshot]</p>
              </div>
            </div>

            {/* Embedded YouTube Videos */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">McKinsey Solve - Part 1</h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    src="https://www.youtube.com/embed/9K0nWwZkF9w" 
                    title="McKinsey Solve 1.bölüm" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full rounded-lg shadow-lg"
                  ></iframe>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">McKinsey Solve - Part 2</h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    src="https://www.youtube.com/embed/dQGrvjjDZgg" 
                    title="McKinsey Solve 2.bölüm" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    className="w-full h-full rounded-lg shadow-lg"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Final Thoughts
            </h2>
            <p>
              The McKinsey Solve game is a fascinating and modern approach to candidate
              evaluation. It effectively tests critical thinking and decision-making
              under pressure. While challenging, the process felt fair and directly
              related to the skills required for a consulting role. It’s a departure
              from traditional interviews and a memorable experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}