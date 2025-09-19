export default function About() {
  return (
    <div className="bg-white py-16 px-4 md:px-12">
      {/* About Section */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">About StepUp</h1>
        <p className="text-dark-700 text-base md:text-xl leading-relaxed">
          StepUp is India's largest sports and athleisure footwear brand. Incorporated in 2006, StepUp Activewear is
one of the leading players in organized sports & casual footwear sector in India. Since 2016, the flagship
brand "StepUp", has been the largest sports and athleisure footwear brand in India, in both volume and
value terms. The company's products are available via an expansive Pan-India network of over 15,000
geo-tagged multi-brand retail stores, 35+ company-owned exclusive outlets, large format stores such as
Walmart, Vishal Retail and Reliance Smart among others and all the leading e-commerce portals.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Our Mission</h2>
        <p className="text-dark-700 text-base md:text-xl leading-relaxed">
          At StepUp we craft shoes with care for everyone- men, women and kids, with an equal attention to
detail, letting each shoe speak for itself. The world-class quality, trendy designs and affordable
prices have captured the imagination of millions of people, across the country- making StepUp,
an aspirational brand especially for - young adults, everyday performers and fashionistas.
        </p>
      </div>

      {/* Center Circular Image */}
      <div className="flex justify-center mb-16">
        <div className="w-64 h-64 rounded-full overflow-hidden shadow-lg">
          <img
            src="/shoess.jpg" // <- Direct path from public folder
            alt="Shoes"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Feature Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="font-semibold text-xl mb-2 font-bold">Simplicity In Design</h3>
          <p className="text-dark-600 text-lg">
            No flashy logos,No senseless details,
Just the world's most comfortable
shoes,made naturally and designed
practically,It's that simple.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-xl mb-2 font-bold">Confidence in Comfort</h3>
          <p className="text-dark-600 text-lg">
           Trying is believing.Give our shoes a
shot for 30 days.and if you're not
walking on cloud nine,we'll take them
back-no questions asked.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-xl mb-2 font-bold">Made from Nature</h3>
          <p className="text-dark-600 text-lg">
            The footwear industry often overlooks
mother Nature's materials in favor of
cheaper,synthetic alternatives.We
think it's time to change that.
          </p>
        </div>
      </div>
    </div>
  );
}


