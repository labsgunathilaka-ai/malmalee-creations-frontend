import React, { useState } from 'react';
import { 
  FiHeart, 
  FiFeather, 
  FiShield, 
  FiAward, 
  FiStar, 
  FiArrowRight,
  FiScissors,
  FiShoppingBag,
  FiMail,
  FiCheckCircle
} from 'react-icons/fi';

const About = ({ onNavigate = () => {} }) => {
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;
    setJoinedWaitlist(true);
    setTimeout(() => {
      setWaitlistEmail('');
    }, 3000);
  };

  return (
    <div className="bg-[#faf8f5] text-gray-800 font-sans">
      
      {/* 1. Hero Story Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-lightBeige/50 via-[#faf8f5] to-[#faf8f5] pt-16 pb-20 px-6 sm:px-12 border-b border-[#ede4d4]">
        
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          <div className="inline-flex items-center space-x-2 bg-white/80 border border-[#e5dcd0] px-3.5 py-1.5 rounded-full mb-6 shadow-xs">
            <FiStar className="text-primaryPurple text-xs" />
            <span className="text-[11px] font-bold text-darkPurple tracking-widest uppercase">
              Meet The Founder & Atelier Story
            </span>
          </div>

          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-darkPurple leading-tight mb-6">
            Handcrafted with Heart, Soul & Boundless Passion
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Every scrunchie, ribbon bow, and bespoke creation is a celebration of resilience, slow fashion, and the pure joy of artisanal creation.
          </p>

        </div>
      </section>

      {/* 2. Founder & Owner Spotlight Section (Editorial Layout) */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 py-20">
        <div className="bg-white rounded-3xl border border-[#efe7dd] p-8 sm:p-12 lg:p-16 shadow-[0_15px_45px_-15px_rgba(61,0,91,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Founder Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#f2ece2] shadow-2xl bg-white p-2">
                <img 
                  src="/owner.jpg" 
                  alt="Malmalee - Founder & Artisan" 
                  className="w-full h-[450px] sm:h-[500px] object-cover object-top rounded-xl"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-darkPurple text-white px-5 py-3.5 rounded-2xl shadow-xl border border-purple-800 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#fdf3e2] text-darkPurple flex items-center justify-center font-bold text-lg">
                  🌸
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-200">Founder & Maker</p>
                  <p className="text-sm font-playfair font-semibold">Malmalee</p>
                </div>
              </div>
            </div>

            {/* Right: Narrative & Biography */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <span className="text-xs font-bold text-primaryPurple tracking-widest uppercase block mb-1">
                  The Heart Behind The Brand
                </span>
                <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-darkPurple leading-snug">
                  Malmalee’s Journey of Courage & Creativity
                </h2>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-darkPurple font-semibold">Malmalee Creations</strong> is an extraordinary brand born out of love, artistic passion, and limitless creativity. As a gifted young woman with special needs, Malmalee found her ultimate voice and joy through the tactile beauty of textiles, silk ribbons, and handmade crafts.
              </p>

              <p className="text-sm text-gray-700 leading-relaxed">
                What began as a personal love for designing colorful ribbon flowers and hair adornments has grown into an inspiring atelier. With tremendous focus, patience, and attention to detail, Malmalee handcrafts luxury hair accessories that preserve hair health while bringing a smile to everyone who wears them.
              </p>

              <p className="text-sm text-gray-700 leading-relaxed">
                Every single piece you purchase directly supports Malmalee’s independence, fosters vocational empowerment for people with special needs, and celebrates genuine slow craftsmanship.
              </p>

              {/* Highlights Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center space-x-2.5 bg-[#faf8f5] p-3 rounded-xl border border-[#efe7dd]">
                  <FiCheckCircle className="text-primaryPurple text-base flex-shrink-0" />
                  <span className="text-xs font-semibold text-gray-800">100% Handcrafted by Malmalee</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-[#faf8f5] p-3 rounded-xl border border-[#efe7dd]">
                  <FiCheckCircle className="text-primaryPurple text-base flex-shrink-0" />
                  <span className="text-xs font-semibold text-gray-800">Grade 6A Mulberry Silk</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-[#faf8f5] p-3 rounded-xl border border-[#efe7dd]">
                  <FiCheckCircle className="text-primaryPurple text-base flex-shrink-0" />
                  <span className="text-xs font-semibold text-gray-800">Zero-Damage Hair Protection</span>
                </div>
                <div className="flex items-center space-x-2.5 bg-[#faf8f5] p-3 rounded-xl border border-[#efe7dd]">
                  <FiCheckCircle className="text-primaryPurple text-base flex-shrink-0" />
                  <span className="text-xs font-semibold text-gray-800">Empowering Special Needs Talent</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. COMING SOON: Clothing Collection Spotlight */}
      <section className="max-w-6xl mx-auto px-6 sm:px-12 py-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-darkPurple via-[#52007a] to-darkPurple text-white p-8 sm:p-12 lg:p-16 shadow-2xl border border-purple-800">
          
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-purple-400/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 bg-amber-300 text-darkPurple px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                <span>✨ Coming Soon</span>
              </div>

              <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
                Bespoke Handcrafted Clothing Collection
              </h2>

              <p className="text-sm sm:text-base text-purple-100 leading-relaxed font-light">
                We are thrilled to announce that our atelier is expanding! Following the cherished success of our hair accessories, Malmalee is currently designing a limited-edition handcrafted apparel line featuring tailored linen dresses, soft silk trims, and easy-wear heirloom garments.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs text-purple-200">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  🌸 Hand-Cut Silhouettes
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  🧵 Pure Natural Linens & Silks
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  🌿 Mindful Small-Batch Tailoring
                </span>
              </div>
            </div>

            {/* Waitlist Form */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20">
              <h3 className="font-playfair text-xl font-bold text-white mb-2">
                Join The Clothing Waitlist
              </h3>
              <p className="text-xs text-purple-200 mb-5 leading-relaxed">
                Be the first to access early-bird previews, VIP fitting invites, and launch discounts.
              </p>

              {joinedWaitlist ? (
                <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-100 text-xs p-4 rounded-xl flex items-center space-x-2">
                  <FiCheckCircle className="text-emerald-300 w-5 h-5 flex-shrink-0" />
                  <span>Thank you! You have been added to our exclusive preview list.</span>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 text-xs bg-white text-gray-900 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-amber-300 hover:bg-amber-200 text-darkPurple font-bold text-xs py-3 rounded-xl transition duration-200 shadow-md cursor-pointer"
                  >
                    Notify Me Upon Launch
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* 4. The 4 Atelier Pillars */}
      <section className="bg-lightBeige/40 py-20 px-6 sm:px-12 border-y border-[#ece2d0] mt-12">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs text-primaryPurple font-bold tracking-widest uppercase">
              Our Core Values
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-darkPurple mt-2 mb-3">
              Why Malmalee Creations is Unique
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Every detail honors craftsmanship, inclusive empowerment, and pure hair wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-white p-7 rounded-2xl border border-[#efe7dd] shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#fdf3e2] border border-[#f7e4c8] flex items-center justify-center text-darkPurple mb-5">
                  <FiHeart className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-darkPurple mb-2">
                  Inclusive Empowerment
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Owned and crafted by a passionate girl with special needs, proving that art and determination have no limits.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-100 text-[11px] text-primaryPurple font-semibold">
                Heart-Centered Brand
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white p-7 rounded-2xl border border-[#efe7dd] shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#fdf3e2] border border-[#f7e4c8] flex items-center justify-center text-darkPurple mb-5">
                  <FiFeather className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-darkPurple mb-2">
                  22-Momme Mulberry Silk
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Certified OEKO-TEX® Grade 6A pure silk rich in natural amino acids that eliminate friction and preserve moisture.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-100 text-[11px] text-primaryPurple font-semibold">
                Nourishing Hydration
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white p-7 rounded-2xl border border-[#efe7dd] shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#fdf3e2] border border-[#f7e4c8] flex items-center justify-center text-darkPurple mb-5">
                  <FiScissors className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-darkPurple mb-2">
                  Hand-Cut & Hand-Stitched
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Each bow and scrunchie is measured, cut, and assembled with meticulous needlework in our Colombo atelier.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-100 text-[11px] text-primaryPurple font-semibold">
                Artisanal Precision
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white p-7 rounded-2xl border border-[#efe7dd] shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#fdf3e2] border border-[#f7e4c8] flex items-center justify-center text-darkPurple mb-5">
                  <FiShield className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-darkPurple mb-2">
                  Zero-Damage Elastic
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Engineered with supple core elastic that provides firm, headache-free hold without pulling or breaking fine hair.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-gray-100 text-[11px] text-primaryPurple font-semibold">
                Creaseless Hold
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Call to Action */}
      <section className="py-20 px-6 sm:px-12 text-center bg-[#faf8f5]">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#efe7dd] p-8 sm:p-14 shadow-sm">
          <span className="text-xs text-primaryPurple font-bold tracking-widest uppercase mb-2 block">
            Support Handmade Couture
          </span>
          <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-darkPurple mb-4">
            Cherish Malmalee’s Handcrafted Creations
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto leading-relaxed mb-8">
            Explore our signature collection of silk scrunchies, tailored velvet bows, and upcoming apparel line.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => onNavigate('home')}
              className="bg-primaryPurple hover:bg-darkPurple text-white px-7 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 cursor-pointer"
            >
              <span>Shop Hair Accessories</span>
              <FiArrowRight />
            </button>
            <button 
              onClick={() => onNavigate('profile')}
              className="bg-[#fdf3e2] hover:bg-[#faebd0] text-darkPurple border border-[#f7e4c8] px-7 py-3.5 rounded-xl font-medium text-sm transition duration-200 cursor-pointer"
            >
              <span>Customer Account</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;
