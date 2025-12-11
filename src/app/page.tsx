import { Star } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const reviews = [
  {
    id: '1',
    author: 'Alex S.',
    location: 'Denver, CO',
    title: 'The Best Selection in Town!',
    text: "I've been to a dozen dispensaries, and leafz green helped me find this gem. The variety is incredible, and the staff is so knowledgeable. Five stars!",
    rating: 5,
    imageId: 'dispensary-1',
  },
  {
    id: '2',
    author: 'Maria G.',
    location: 'San Francisco, CA',
    title: 'Finally, Honest Reviews!',
    text: 'Tired of wading through fake reviews online. The community on leafz green is the real deal. Found a dispensary with amazing quality that I trust.',
    rating: 5,
    imageId: 'dispensary-2',
  },
  {
    id: '3',
    author: 'Jordan P.',
    location: 'Los Angeles, CA',
    title: 'Clean, Modern, and Friendly',
    text: "The dispensary I found here was top-notch. The atmosphere was welcoming and the product recommendations were spot on. This app is my go-to now.",
    rating: 5,
    imageId: 'dispensary-3',
  },
   {
    id: '4',
    author: 'Casey B.',
    location: 'Seattle, WA',
    title: 'A Game-Changer for Newbies',
    text: "As someone new to cannabis, I was a bit intimidated. leafz green's detailed reviews and ratings made it easy to find a place where I felt comfortable asking questions.",
    rating: 5,
    imageId: 'dispensary-1',
  },
  {
    id: '5',
    author: 'Riley T.',
    location: 'Portland, OR',
    title: 'Found My Perfect Strain',
    text: "Thanks to a detailed review on leafz green, I discovered a strain that's perfect for my needs. The user descriptions are so much more helpful than generic menus.",
    rating: 5,
    imageId: 'dispensary-2',
  },
   {
    id: '6',
    author: 'Morgan W.',
    location: 'Las Vegas, NV',
    title: 'Saved Me Time and Money',
    text: "I used to drive all over town. Now, I just check leafz green. The reviews are consistently accurate, and I haven't been disappointed yet. Highly recommend!",
    rating: 5,
    imageId: 'dispensary-3',
  },
];

const ReviewCard = ({ review }: { review: (typeof reviews)[0] }) => {
  const placeholder = PlaceHolderImages.find((p) => p.id === review.imageId);
  const imageUrl = placeholder?.imageUrl ?? 'https://picsum.photos/seed/1/600/400';
  const imageHint = placeholder?.imageHint ?? 'dispensary interior';

  return (
    <div className="flex-shrink-0 w-[90vw] md:w-[781px] grid grid-cols-1 md:grid-cols-[300px_1fr] bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-48 md:h-full">
        <Image
          src={imageUrl}
          alt={review.title}
          fill
          className="object-cover"
          data-ai-hint={imageHint}
        />
      </div>
      <div className="p-6 md:p-10 flex flex-col justify-center">
        <div className="flex mb-2">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
        <h3 className="text-xl lg:text-2xl font-semibold leading-tight mb-3 font-headline">
          “{review.title}”
        </h3>
        <p className="text-muted-foreground text-sm lg:text-base mb-4">
            {review.text}
        </p>
        <div className="flex items-center gap-2 mt-auto">
             <div className='w-8 h-px bg-muted-foreground'></div>
            <p className="text-sm font-semibold text-muted-foreground">
                {review.author}
                <span className="font-normal"> from {review.location}</span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  // Duplicate reviews to ensure a seamless looping animation
  const extendedReviews = [...reviews, ...reviews];

  return (
    <div className="bg-background text-foreground w-full overflow-x-hidden">
      <div className="container mx-auto px-4 py-16 sm:py-24 text-center">
         <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary font-headline">
          Welcome to leafz green
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Your trusted guide to the best dispensaries, powered by real user reviews.
        </p>
      </div>

      <section className="relative -rotate-3 transform-gpu">
        <div className="flex gap-8 md:animate-marquee-first">
          {extendedReviews.slice(0, 6).map((review, index) => (
            <ReviewCard key={`first-${review.id}-${index}`} review={review} />
          ))}
        </div>
         <div className="hidden md:flex gap-8 mt-8 md:animate-marquee-second">
          {extendedReviews.slice(3, 9).map((review, index) => (
            <ReviewCard key={`second-${review.id}-${index}`} review={review} />
          ))}
        </div>
      </section>

       <div className="container mx-auto px-4 py-16 sm:py-32 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-headline mb-4">
          Ready to Get Started?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore dispensaries in your state and join our community of reviewers.
        </p>
         <div className="mt-8">
            <a
              href="/admin"
              className="inline-block bg-primary text-primary-foreground font-semibold rounded-full px-8 py-3 hover:bg-primary/90 transition-colors"
            >
              Explore Dispensaries
            </a>
        </div>
      </div>
    </div>
  );
}
