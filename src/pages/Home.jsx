import { useEffect, useState, useMemo } from "react";
import axiosInstance from "../api/axiosInstance";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function Home() {
  // ✅ Product Fetching (for Featured Products)
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axiosInstance.get("/products/").then((res) => setProducts(res.data));
  }, []);

  // ✅ Carousel Data (Images + Promo Text)
  const slides = useMemo(
    () => [
      {
        image: "/banners/ban1.jpg",
        title: "Womens Red High Heels for Party",
        subtitle: "Get a free gift with your first order!",
        link: "/womens",
      },
      {
        image: "/banners/ban2.jpg",
        title: "Mens Office Shoes",
        subtitle: "Perfect comfort for walking and running.",
        link: "/mens",
      },
      {
        image: "/banners/ban3.jpg",
        title: "Casual Shoes Collection",
        subtitle: "Trendy and affordable for daily wear.",
        link: "/womens",
      },
      {
        image: "/banners/ban4.jpg",
        title: "Elegant Formal Shoes",
        subtitle: "Complete your office look in style.",
        link: "/kids",
      },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Auto-rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlide = slides[currentIndex];

  // ✅ Category Data
  const categories = [
    { name: "Mens", image: "/banners/mens.jpg" , link: "/mens" },
    { name: "Womens", image: "/banners/womens.png", link: "/womens"  },
    { name: "Kids", image: "/banners/kids.png", link: "/kids"  },
  ];

  // ✅ Hardcoded New & Trending Products
  const trendingProducts = [
    {
      name: "Ophelia Womens Silver Diamante Heel",
      price: "₹ 2,299",
      image: "/image1.jpg",
      link: "/womens",
    },
    {
      name: "Billie Womens Silver Diamante Heel",
      price: "₹ 3,000",
      image: "/image2.jpg",
      link: "/womens",
    },
    {
      name: "Drew Womens Blush Diamante Slip On Shoe",
      price: "₹ 2,599",
      image: "/image3.jpg",
      link: "/womens",
    },
    {
      name: "Drew Womens Navy Diamante Slip On Shoe",
      price: "₹ 1,299",
      image: "/image4.jpg",
      link: "/womens",
    },
    {
      name: "Weaver Mens Navy Lace Up Trainer",
      price: "₹ 2,099",
      image: "/image5.jpg",
      link: "/mens",
    },
    {
      name: "Weaver Mens White Lace Up Trainer",
      price: "₹ 2,199",
      image: "/image6.jpg",
      link: "/mens",
    },
    {
      name: "Calista Girls Pink Daisy Print Sandal",
      price: "₹ 1,499",
      image: "/image7.jpg",
      link: "/kids",
    },
    {
      name: "Colby Boys Blue Dinosaur Canvas",
      price: "₹ 999",
      image: "/image8.jpg",
      link: "/kids",
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* ✅ Hero Section */}
 

<section
  className="relative w-full flex items-center justify-center bg-gray-100 overflow-hidden"
  style={{ height: "500px" }}
>
  <img
    src={currentSlide.image}
    alt="Product Banner"
    className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
  />

  {/* Promo Text */}
  <div className="absolute left-8 top-1/4 bg-black bg-opacity-70 text-white p-6 rounded-2xl max-w-sm shadow-lg">
    <h2 className="text-2xl font-bold">{currentSlide.title}</h2>
    <p className="text-lg mt-2">{currentSlide.subtitle}</p>

    {/* Shop Now button as Link */}
    {currentSlide.link ? (
      <Link
        to={currentSlide.link}
        className="mt-4 inline-block px-6 py-2 bg-white text-black rounded-lg font-medium shadow hover:bg-gray-200 transition"
      >
        Shop Now
      </Link>
    ) : (
      <button className="mt-4 px-6 py-2 bg-white text-black rounded-lg font-medium shadow hover:bg-gray-200 transition">
        Shop Now
      </button>
    )}
  </div>

  {/* Slider Dots */}
  <div className="absolute bottom-4 flex gap-2">
    {slides.map((_, index) => (
      <span
        key={index}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          index === currentIndex ? "bg-black scale-110" : "bg-gray-400"
        }`}
      ></span>
    ))}
  </div>
</section>


      {/* ✅ Overview Section */}
      <section className="py-10 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="text-gray-700 leading-relaxed text-2xl px-4">
          Explore our curated selection of high-quality shoes for every occasion.
          From durable athletic shoes designed for peak performance to stylish
          casual sneakers and elegant dress shoes, we offer a diverse range of
          footwear to suit your needs.
        </p>
      </section>

      {/* ✅ Category Section */}


<section className="py-12 bg-white">
  <h2 className="text-2xl font-bold text-center mb-10">
    What are you looking for?
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
    {categories.map((cat, idx) => (
      <Link
        to={cat.link}   // <-- Navigate to the category page
        key={idx}
        className="flex flex-col items-center"
      >
        <div className="w-full h-[400px] overflow-hidden rounded-2xl shadow-md">
          <img
            src={cat.image}
            alt={cat.name}
            className="w-full object-cover transition-transform duration-300 hover:scale-105"
            style={{ height: '400px' }}
          />
        </div>
        <h3 className="mt-4 text-lg font-semibold">{cat.name}</h3>
      </Link>
    ))}
  </div>
</section>
  

<section className="py-12 bg-white">
  <h2 className="text-2xl font-bold text-center mb-10">New & Trending</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
    {trendingProducts.map((product, idx) => (
      <Link
        to={product.link}  // <-- navigation
        key={idx}
        className="bg-gray-50 rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center text-center"
      >
        <div className="w-full aspect-square overflow-hidden rounded-md mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[300px] object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="text-gray-600 mt-1">MRP : {product.price}</p>
      </Link>
    ))}
  </div>
</section>

    </div>
  );
}


