import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About CompanyVerse',
  description: 'Learn about the mission and vision of CompanyVerse.',
};

export default function AboutPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            About Company
            <span className="ml-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Verse
            </span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            Your Money, Your Voice.
          </p>
        </div>
        <div className="mt-16 space-y-12 text-lg leading-relaxed text-gray-700">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Belief: A Company&apos;s Reputation is Everything
            </h2>
            <p>
              Like a person, a company has a reputation. It&apos;s more than just a name or a logo; it&apos;s a living history of its actions, a reflection of its character, and a promise for its future. We believe that this reputation is a company&apos;s most valuable asset, and it should be transparent, accountable, and shaped by those who know it best: its customers and employees.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              The Problem: The Silent Frustration
            </h2>
            <p>
              For too long, customer frustrations have been treated as private disputes to be resolved behind the closed doors of a customer service department. A bad experience becomes an isolated incident, not a pattern. We believe this needs to change. A customer&apos;s disappointment should not be just a ticket number; it should be a permanent stain on a company&apos;s public reputation when deserved.
            </p>
          </div>
           <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="mb-4">
             Our mission is to build a transparent ecosystem where the collective voice of the people measures the true reputation of a company. We aim to:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Empower Customers:</strong> To give every customer a voice that echoes, ensuring their experiences—good and bad—directly impact a company&apos;s standing.
              </li>
              <li>
                <strong>Champion Ethical Companies:</strong> To help customer-friendly, eco-friendly, and genuinely &quot;good&quot; companies stand out from the crowd and be rewarded for their integrity.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Join the Movement
            </h2>
            <p>
              Your voice has power. Share your experience. Hold companies accountable. Help us build a more transparent and fair marketplace for everyone 🏁.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
