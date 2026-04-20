import React from "react";
import Image from "next/image";
import { Heart, Star, BookOpen } from "lucide-react";
import Link from "next/link";

const BookCard = ({ book }) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-xl transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl">
      {/* Image Section */}
      <div className="relative h-80 overflow-hidden">
        {/* <Image
          src={book.thumbnail}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 1280px) 100vw, 400px"
          priority={book.id <= 3}
        /> */}

        {/* Availability Badge */}
        <div
          className={`absolute bottom-6 left-6 rounded-3xl px-5 py-2 text-xs font-bold shadow-lg ${
            book.stock > 0
              ? "bg-emerald-500 text-white"
              : "bg-rose-500 text-white"
          }`}
        >
          {book.stock > 0 ? "✓ In Stock" : "✕ Out of Stock"}
        </div>

        {/* Best Seller Badge */}
        {book.rating >= 4.7 && (
          <div className="absolute top-6 left-6 rounded-3xl bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-1 text-xs font-bold text-white shadow-md">
            ★ BEST SELLER
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <span className="inline-block rounded-3xl bg-blue-100 px-4 py-1 text-xs font-semibold tracking-widest text-blue-700">
              {book.category}
            </span>

            <h2 className="mt-4 line-clamp-2 text-2xl font-semibold leading-tight text-slate-900">
              {book.title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">by {book.author}</p>
          </div>

          <button className="rounded-2xl border border-slate-200 p-3 transition-all duration-200 hover:scale-110 hover:border-rose-200 hover:text-rose-500 active:scale-95">
            <Heart size={22} />
          </button>
        </div>

        <div className="mt-6 flex items-center gap-5 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-1.5">
            <Star size={19} className="fill-amber-400 text-amber-400" />
            <span className="text-xl font-semibold text-slate-700">
              {book.rating}
            </span>
          </div>

          <div className="h-5 w-px bg-slate-200" />

          <div className="flex items-center gap-1.5 text-slate-500">
            <BookOpen size={18} />
            <span className="font-medium">ID #{book.id}</span>
          </div>

          <div className="ml-auto rounded-3xl bg-violet-100 px-5 py-1 text-xs font-medium text-violet-700">
            Premium Collection
          </div>
        </div>

        <p className="mt-6 line-clamp-3 text-base leading-relaxed text-slate-600">
          {book.description ||
            "A carefully selected masterpiece crafted to elevate your knowledge, mindset, and personal growth."}
        </p>
      </div>

      {/* Price & Actions */}
      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-7 py-6">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Starting from
          </span>
          <div className="text-4xl font-bold text-slate-900">${book.price}</div>
        </div>

        <div className="flex flex-col gap-3">
         <Link href={`/books/${book.id}`}>
          <button className="rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95">
            View Details
          </button>
         </Link>

          <button className="rounded-3xl border border-slate-300 px-8 py-4 text-sm font-semibold text-slate-700 transition-all hover:bg-white active:scale-95">
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;