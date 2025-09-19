import { useContext } from "react";
import CartContext from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p>${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700"
      >
        Add to Cart
      </button>
    </div>
  );
}

