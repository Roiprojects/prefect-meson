import avatarAnanya from '../assets/review_avatar_ananya.jpg';
import avatarRahul from '../assets/review_avatar_rahul.jpg';
import avatarVikram from '../assets/review_avatar_vikram.jpg';
import avatarKavitha from '../assets/review_avatar_kavitha.jpg';
import featuredPriya from '../assets/review_featured_priya.jpg';

export interface ClientReviewItem {
  id: string;
  type: 'standard' | 'featured';
  clientName: string;
  service: string;
  category: string;
  location: string;
  quote: string;
  rating: number;
  avatar?: string;
  image?: string;
}

export interface ClientReviewsSectionData {
  eyebrow: string;
  headline: {
    line1: string;
    line2: string;
  };
  description: string;
  reviews: ClientReviewItem[];
}

export const reviewsConfig: ClientReviewsSectionData = {
  eyebrow: 'CLIENT REVIEWS',
  headline: {
    line1: 'What our clients say',
    line2: 'about building with us',
  },
  description:
    'Real feedback from clients who trusted Perfect Mason with their construction, turnkey and interior projects.',
  reviews: [
    {
      id: 'review-01',
      type: 'standard',
      clientName: 'Ananya Rao',
      service: 'Residential Construction',
      category: 'Residential',
      location: 'Bengaluru, Karnataka',
      quote:
        'Perfect Mason handled our home construction with excellent coordination, clear communication and careful attention to every detail.',
      rating: 5,
      avatar: avatarAnanya,
    },
    {
      id: 'review-02',
      type: 'standard',
      clientName: 'Rahul Mehta',
      service: 'Turnkey Project',
      category: 'Turnkey',
      location: 'Hyderabad, Telangana',
      quote:
        'From planning to execution, the team made the entire turnkey process clear and well coordinated. The finishing quality exceeded our expectations.',
      rating: 5,
      avatar: avatarRahul,
    },
    {
      id: 'review-03',
      type: 'standard',
      clientName: 'Vikram Sengupta',
      service: 'Commercial Construction',
      category: 'Commercial',
      location: 'Whitefield, Bangalore',
      quote:
        'Delivered our corporate business centre on schedule with zero structural compromise. Their engineering precision and transparency are unmatched.',
      rating: 5,
      avatar: avatarVikram,
    },
    {
      id: 'review-04',
      type: 'standard',
      clientName: 'Dr. Kavitha Reddy',
      service: 'Luxury Villa Construction',
      category: 'Residential',
      location: 'Bengaluru, Karnataka',
      quote:
        'The architectural planning and spatial flow of our family estate are extraordinary. Perfect Mason exceeded every single benchmark we set.',
      rating: 5,
      avatar: avatarKavitha,
    },
    {
      id: 'review-05',
      type: 'featured',
      clientName: 'Priya Sharma',
      service: 'Interior Design & Execution',
      category: 'Interiors',
      location: 'Bengaluru, Karnataka',
      quote:
        'The execution speed, attention to timber detailing, and spatial lighting turned our dream villa into a stunning reality.',
      rating: 5,
      image: featuredPriya,
    },
  ],
};
