"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  BatteryCharging,
  Zap,
  Ruler,
  Gauge,
  ShieldCheck,
  Activity,
  Timer,
} from "lucide-react";

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:3001/cars/${id}`);
      const data = await res.json();

      setProduct(data);
      setSelectedVariant(data.variants?.[0]?.id);
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

  const activeVariant = product.variants.find(
    (v: any) => v.id === selectedVariant
  );

  const info = product.moreInfo;

  return (
    <div className="bg-black text-white min-h-screen">

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-16 items-center">

        {/* IMAGE */}
        <div>
          <img
            key={selectedColor?.imageUrl}
            src={selectedColor?.imageUrl || product.modelImg}
            alt={product.model}
            className="rounded-3xl shadow-2xl w-full aspect-[16/9] object-cover transition-all duration-500"
          />
        </div>

        {/* DETAILS */}
        <div className="space-y-8">

          <h1 className="text-4xl md:text-5xl font-bold">
            {product.model}
          </h1>

          <p className="text-gray-400 text-lg">
            {product.description}
          </p>

          {/* COLOR SELECTOR */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Select Color</h3>
            <div className="flex gap-5">
              {product.colors.map((color: any) => (
                <div
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full cursor-pointer border-2 transition ${
                    selectedColor?.id === color.id
                      ? "border-white scale-110"
                      : "border-gray-600"
                  }`}
                  style={{ backgroundColor: getColorHex(color.name) }}
                />
              ))}
            </div>
            <p className="text-gray-400 mt-3">{selectedColor?.name}</p>
          </div>

          {/* PRICE */}
          <div className="text-3xl font-bold text-red-500">
            ₹ {activeVariant?.price.toLocaleString()}
          </div>

          <button
            onClick={() => router.push(`/products/${product.id}/build`)}
            className="bg-white text-black px-10 py-4 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Build & Price
          </button>
        </div>
      </div>

      {/* PERFORMANCE HIGHLIGHTS */}
      <div className="bg-zinc-900 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          <IconStat
            icon={<Timer size={32} />}
            label="0-100 km/h"
            value={`${info.performance.zeroToHundred}s`}
          />

          <IconStat
            icon={<Zap size={32} />}
            label="Horsepower"
            value={`${info.performance.horsePower} hp`}
          />

          <IconStat
            icon={<Activity size={32} />}
            label="Torque"
            value={`${info.performance.torqueNm} Nm`}
          />

          <IconStat
            icon={<Gauge size={32} />}
            label="Top Speed"
            value={`${product.topSpeed} km/h`}
          />

        </div>
      </div>

      {/* SPECIFICATIONS SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">

        <SectionTitle title="Battery & Charging" />

        <div className="grid md:grid-cols-2 gap-6">
          <SpecCard
            icon={<BatteryCharging size={28} />}
            label="Capacity"
            value={`${info.battery.capacityKwh} kWh`}
          />

          <SpecCard
            icon={<Zap size={28} />}
            label="Fast Charging"
            value={info.battery.fastCharging}
          />
        </div>

        {/* <SectionTitle title="Dimensions" />

        <div className="grid md:grid-cols-2 gap-6">
          <SpecCard
            icon={<Ruler size={28} />}
            label="Length"
            value={`${info.dimensions.lengthMm} mm`}
          />

          <SpecCard
            icon={<Ruler size={28} />}
            label="Width"
            value={`${info.dimensions.widthMm} mm`}
          />

          <SpecCard
            icon={<Ruler size={28} />}
            label="Height"
            value={`${info.dimensions.heightMm} mm`}
          />

          <SpecCard
            icon={<Ruler size={28} />}
            label="Wheelbase"
            value={`${info.dimensions.wheelbaseMm} mm`}
          />
        </div> */}

        <SectionTitle title="Features" />
        <ul className="grid md:grid-cols-2 gap-4 text-gray-300">
          {info.features.map((feature: string, i: number) => (
            <li key={i} className="bg-zinc-800 p-4 rounded-xl">
              {feature}
            </li>
          ))}
        </ul>

        <SectionTitle title="Warranty" />

        <div className="grid md:grid-cols-2 gap-6">
          <SpecCard
            icon={<ShieldCheck size={28} />}
            label="Vehicle Warranty"
            value={info.warranty.vehicle}
          />

          <SpecCard
            icon={<ShieldCheck size={28} />}
            label="Battery Warranty"
            value={info.warranty.battery}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Small Reusable Components ---------- */

function Stat({ label, value }: any) {
  return (
    <div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-gray-400 mt-2">{label}</div>
    </div>
  );
}

function SectionTitle({ title }: any) {
  return (
    <h2 className="text-3xl font-bold border-b border-gray-700 pb-4">
      {title}
    </h2>
  );
}

function SpecsGrid({ data }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {data.map(([label, value]: any, index: number) => (
        <div key={index} className="bg-zinc-800 p-6 rounded-xl">
          <p className="text-gray-400">{label}</p>
          <p className="text-xl font-semibold mt-2">{value}</p>
        </div>
      ))}
    </div>
  );
}

/* Color helper */
function getColorHex(name: string) {
  const map: any = {
    "Pearl White": "#f5f5f5",
    "Solid Black": "#000000",
    "Deep Blue": "#0f3057",
    "Red Multi-Coat": "#8b0000",
  };

  return map[name] || "#999";
}

function IconStat({ icon, label, value }: any) {
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="text-red-500">{icon}</div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

function SpecCard({ icon, label, value }: any) {
  return (
    <div className="bg-zinc-800 p-6 rounded-2xl flex items-start gap-4 hover:bg-zinc-700 transition">
      <div className="text-red-500">{icon}</div>
      <div>
        <p className="text-gray-400">{label}</p>
        <p className="text-xl font-semibold mt-1">{value}</p>
      </div>
    </div>
  );
}