// src/app/profile/edit-review/[id]/page.tsx
import { createClient } from '@/utils/supabase/server';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import EditReviewForm from '@/components/EditReviewForm'; // YENİ BİLEŞENİ IMPORT EDİYORUZ

type EditReviewPageProps = {
  params: {
    id: string;
  }
}

export default async function EditReviewPage({ params }: EditReviewPageProps) {
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect('/');
  }

  const reviewId = Number(params.id);
  if (isNaN(reviewId)) {
    notFound();
  }

  const { data: review, error } = await supabase
    .from('reviews')
    .select('*, companies(name, slug)')
    .eq('id', reviewId)
    .eq('user_id', session.user.id)
    .single();

  if (error || !review) {
    notFound();
  }

  return (
    <main className="container mx-auto px-6 py-24 sm:py-32">
      <div className="mb-8">
        <Link href="/profile" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 transition-colors">
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Back to My Profile
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900">Edit Your Review</h1>
        <p className="text-xl text-gray-600 mt-2">for {review.companies?.name}</p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
         {/* "Edit form will be here" YERİNE ARTIK GERÇEK FORMU KOYUYORUZ */}
         <EditReviewForm review={review} />
      </div>
    </main>
  );
}