import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import { plantCareArticles } from '../../data/homeContent';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const articleVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 18,
    },
  },
};

export default function PlantCareJournal() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-white border-y border-forest/10 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-forest/15"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-mono tracking-widest text-botanical mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Botanical Knowledge
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-forest tracking-tight">
              The Plant Care <span className="font-serif italic font-normal text-botanical">Journal.</span>
            </h2>
          </div>

          <Link
            to="/plant-care"
            className="font-sans text-xs uppercase tracking-editorial font-semibold text-forest hover:text-botanical inline-flex items-center gap-1 group"
          >
            <span>Read All Care Guides</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </motion.div>

        {/* 3 Journal Articles Cards with Staggered Motion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plantCareArticles.map((article) => (
            <motion.article
              key={article.id}
              variants={articleVariants}
              whileHover={{ y: -8 }}
              className="group flex flex-col justify-between bg-offwhite rounded-editorial border border-forest/10 overflow-hidden shadow-subtle hover:shadow-floating transition-shadow duration-300"
            >
              <div>
                {/* Article Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] uppercase font-mono tracking-wider text-forest font-semibold shadow-sm">
                    {article.category}
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 sm:p-7 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-charcoal/50">
                    <Clock className="w-3 h-3 text-botanical" />
                    <span>{article.readTime}</span>
                    <span>·</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="font-serif text-xl text-forest group-hover:text-botanical transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="p-6 sm:p-7 pt-0">
                <Link
                  to={`/plant-care`}
                  className="font-serif italic text-sm text-forest group-hover:text-botanical inline-flex items-center gap-1.5 transition-colors border-b border-forest/20 pb-0.5 hover:border-botanical"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}