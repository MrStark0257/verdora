import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import Rating from '../ui/Rating';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { sampleReviews } from '../../data/products';

export default function ProductReviews({ product }) {
  const [reviews, setReviews] = useState(sampleReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: 'Just now',
      verified: true,
      title: newTitle || 'Exceptional Botanical Quality',
      comment: newComment,
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setShowReviewForm(false);
      setSubmitted(false);
      setNewAuthor('');
      setNewTitle('');
      setNewComment('');
      setNewRating(5);
    }, 2000);
  };

  return (
    <div className="space-y-12">
      {/* Top Ratings Overview Bar */}
      <div className="p-8 bg-cream/50 rounded-editorial border border-forest/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div>
            <span className="font-serif text-5xl sm:text-6xl text-forest font-semibold block">
              {product.rating}
            </span>
            <span className="text-xs text-charcoal/60 font-mono">out of 5.0 stars</span>
          </div>

          <div className="space-y-1.5">
            <Rating rating={product.rating} size="md" showScore={false} />
            <p className="text-xs font-sans text-charcoal/70">
              Based on <strong>{product.reviewCount || 142}</strong> verified plant lover reviews
            </p>
            <div className="flex items-center gap-1.5 text-xs text-botanical font-medium">
              <ShieldCheck className="w-4 h-4 text-botanical" />
              <span>100% Certified Botanical Living Acquisitions</span>
            </div>
          </div>
        </div>

        <Button
          variant="secondary"
          size="md"
          icon={MessageSquarePlus}
          onClick={() => setShowReviewForm(!showReviewForm)}
        >
          {showReviewForm ? 'Close Form' : 'Write a Review'}
        </Button>
      </div>

      {/* Write Review Form */}
      {showReviewForm && (
        <form
          onSubmit={handleSubmit}
          className="p-8 bg-white rounded-editorial border border-forest/15 shadow-subtle space-y-5 animate-fadeIn"
        >
          <h4 className="font-serif text-xl text-forest">Share Your Botanical Experience</h4>

          <div>
            <label className="block text-xs uppercase font-mono tracking-widest text-charcoal/70 mb-2">
              Select Your Rating
            </label>
            <Rating
              rating={newRating}
              size="lg"
              interactive={true}
              onChange={(r) => setNewRating(r)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Your Name / City"
              placeholder="e.g. Priya Sharma, Bengaluru"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              required
            />
            <Input
              label="Review Headline"
              placeholder="e.g. Thriving foliage, lush packaging"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-mono tracking-widest text-charcoal/70 mb-2">
              Detailed Notes on Plant Vitality & Care
            </label>
            <textarea
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="How was the unboxing? How has the plant adapted to your room's light?"
              className="w-full bg-white border border-forest/20 rounded-editorial p-3.5 text-sm font-sans text-charcoal outline-none focus:border-forest"
              required
            />
          </div>

          {submitted ? (
            <div className="flex items-center gap-2 text-botanical text-sm font-medium">
              <CheckCircle2 className="w-5 h-5" />
              <span>Thank you! Your botanical review has been published.</span>
            </div>
          ) : (
            <Button type="submit" variant="primary" size="md">
              Publish Review
            </Button>
          )}
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        <h4 className="font-serif text-2xl text-forest">
          Customer Notes & Care Impressions ({reviews.length})
        </h4>

        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white rounded-editorial border border-forest/10 shadow-subtle space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-medium text-forest text-base">
                      {rev.author}
                    </span>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-sage bg-forest px-2 py-0.5 rounded-pill">
                        <ShieldCheck className="w-3 h-3 text-sage" />
                        Verified
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-charcoal/40">{rev.date}</span>
                </div>

                <Rating rating={rev.rating} size="sm" showScore={false} />
              </div>

              {rev.title && (
                <h5 className="font-serif font-medium text-forest text-sm">
                  {rev.title}
                </h5>
              )}

              <p className="font-sans text-xs sm:text-sm text-charcoal/80 leading-relaxed">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

