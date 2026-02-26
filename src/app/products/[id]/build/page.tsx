"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function BuildPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedColor, setSelectedColor] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:3001/cars/${id}`);
      const data = await res.json();

      setProduct(data);
      setSelectedVariant(data.variants?.[0]);
      setSelectedColor(data.colors?.[0]);
    };

    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const totalPrice = selectedVariant?.price || product.basePrice;

  return (
    <div className="bg-black text-white min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

        {/* LEFT: IMAGE */}
        <div>
          <img
            src={selectedColor?.imageUrl}
            alt={product.model}
            className="rounded-2xl shadow-2xl w-full aspect-[16/9] object-cover"
          />
        </div>

        {/* RIGHT: CONFIGURATION */}
        <div className="space-y-10">

          <h1 className="text-5xl font-bold">
            Build Your {product.model}
          </h1>

          {/* VARIANTS */}
          <div>
            <h3 className="text-xl mb-4 font-semibold">
              Choose Variant
            </h3>

            <div className="flex flex-col gap-4">
              {product.variants.map((variant: any) => (
                <div
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`p-6 rounded-xl border cursor-pointer transition ${
                    selectedVariant?.id === variant.id
                      ? "border-white bg-zinc-900"
                      : "border-gray-700 hover:bg-zinc-800"
                  }`}
                >
                  <div className="flex justify-between">
                    <span>{variant.name}</span>
                    <span>₹ {variant.price.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLORS */}
          <div>
            <h3 className="text-xl mb-4 font-semibold">
              Choose Color
            </h3>

            <div className="flex gap-6">
              {product.colors.map((color: any) => (
                <div
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full border-2 cursor-pointer transition ${
                    selectedColor?.id === color.id
                      ? "border-white scale-110"
                      : "border-gray-600"
                  }`}
                  style={{
                    backgroundColor: getColorHex(color.name),
                  }}
                />
              ))}
            </div>

            <p className="text-gray-400 mt-4">
              {selectedColor?.name}
            </p>
          </div>

          {/* TOTAL */}
          <div className="border-t border-gray-700 pt-6">
            <h2 className="text-3xl font-bold">
              Total: ₹ {totalPrice.toLocaleString()}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

function getColorHex(name: string) {
  const map: any = {
    "Pearl White": "#f5f5f5",
    "Solid Black": "#000000",
    "Midnight Silver": "#5c5c5c",
    "Deep Blue Metallic": "#0f3057",
    "Crimson Red": "#8b0000",
    "Arctic White": "#ffffff",
    "Carbon Black": "#1a1a1a",
    "Electric Blue": "#1e3a8a",
    "Glacier White": "#f0f0f0",
    "Matte Grey": "#4b5563"
  };
  return map[name] || "#999";
}