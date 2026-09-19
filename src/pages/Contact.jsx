import React, { useState } from 'react';
import { FiClock, FiInstagram, FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSent(true);
  };

  return (
    <main className="bg-[#fff8fb] text-gray-800 font-sans">
      <section className="bg-[#ffaed7] px-6 py-16 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-pink-950 mb-4">We would love to hear from you</p>
          <h1 className="max-w-3xl font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-pink-950 leading-tight">
            Let&apos;s create something beautiful together.
          </h1>
          <p className="max-w-xl text-sm sm:text-base text-pink-950/80 leading-relaxed mt-6">
            Questions about an order, a custom piece, or choosing the right silk accessory? Send us a note and Malmalee&apos;s atelier will be in touch.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 sm:px-12 lg:px-20 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
          <div className="border border-pink-100 bg-white p-6 sm:p-8 shadow-[0_15px_45px_-25px_rgba(196,0,99,0.3)]">
            <div className="flex items-start justify-between gap-5 border-b border-pink-100 pb-6 mb-7">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primaryPurple mb-2">Our little corner</p>
                <h2 className="font-playfair text-3xl font-bold text-darkPurple">Visit the atelier</h2>
              </div>
              <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center border border-pink-200 bg-[#ffaed7] text-2xl font-playfair font-bold text-pink-950" aria-hidden="true">
                M
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-8 max-w-md">
              Our small studio is built around thoughtful details, handcrafted pieces, and warm conversations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7">
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-pink-50 text-primaryPurple">
                  <FiMapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900">Find us</h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">Colombo, Sri Lanka</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-pink-50 text-primaryPurple">
                  <FiMail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900">Email</h3>
                  <a href="mailto:hello@malmaleecreations.com" className="text-sm text-primaryPurple hover:text-darkPurple transition mt-1 inline-block break-all">
                    hello@malmaleecreations.com
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-pink-50 text-primaryPurple">
                  <FiPhone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900">Call us</h3>
                  <a href="tel:+94771234567" className="text-sm text-primaryPurple hover:text-darkPurple transition mt-1 inline-block">
                    +94 77 123 4567
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-pink-50 text-primaryPurple">
                  <FiClock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-gray-900">Studio hours</h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">Mon to Sat<br />9:00 AM to 5:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-pink-100 pt-5">
              <p className="text-xs italic text-gray-500">Made slowly, with care.</p>
              <a href="#instagram" className="inline-flex items-center gap-2 text-sm font-semibold text-primaryPurple hover:text-darkPurple transition">
                <FiInstagram /> Follow our atelier
              </a>
            </div>
          </div>

          <div className="bg-white border border-pink-100 p-6 sm:p-8 shadow-[0_15px_45px_-20px_rgba(196,0,99,0.25)]">
            <div className="mb-7">
              <h2 className="font-playfair text-3xl font-bold text-darkPurple">Send a message</h2>
              <p className="text-sm text-gray-500 mt-2">We usually reply within one business day.</p>
            </div>

            {isSent && (
              <div className="bg-pink-50 border border-pink-200 text-pink-950 text-sm px-4 py-3 mb-6" role="status">
                Thank you for reaching out. We&apos;ll be in touch soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Your name
                  <input required type="text" name="name" className="mt-2 w-full border border-gray-200 px-3 py-3 text-sm font-normal text-gray-800 outline-none focus:border-primaryPurple focus:ring-1 focus:ring-primaryPurple" />
                </label>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Email address
                  <input required type="email" name="email" className="mt-2 w-full border border-gray-200 px-3 py-3 text-sm font-normal text-gray-800 outline-none focus:border-primaryPurple focus:ring-1 focus:ring-primaryPurple" />
                </label>
              </div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Subject
                <input required type="text" name="subject" className="mt-2 w-full border border-gray-200 px-3 py-3 text-sm font-normal text-gray-800 outline-none focus:border-primaryPurple focus:ring-1 focus:ring-primaryPurple" />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                Message
                <textarea required name="message" rows="5" className="mt-2 w-full resize-y border border-gray-200 px-3 py-3 text-sm font-normal text-gray-800 outline-none focus:border-primaryPurple focus:ring-1 focus:ring-primaryPurple" />
              </label>
              <button type="submit" className="inline-flex items-center justify-center gap-2 bg-primaryPurple px-6 py-3 text-sm font-semibold text-white transition hover:bg-darkPurple">
                Send message <FiSend />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;