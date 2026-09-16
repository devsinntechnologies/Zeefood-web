"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/store/types";

type DealConfig = {
    title: string;
    label: string;
    description: string;
    discount: number;
};

type DealCard = {
    id: string;
    title: string;
    label: string;
    description: string;
    product: Product;
    originalPrice: number;
    salePrice: number;
};

const DEALS: DealConfig[] = [
    { title: "Midweek Feast", label: "Save 20%", description: "A comforting pick for an easy, flavorful meal.", discount: 0.2 },
    { title: "Weekend Favorite", label: "Best Seller", description: "A crowd-pleasing choice for your weekend table.", discount: 0.18 },
    { title: "Signature Special", label: "Limited Time", description: "One of our most loved dishes, offered at a special price.", discount: 0.22 },
    { title: "Fresh Pick", label: "Save 15%", description: "A simple, satisfying choice made for today.", discount: 0.15 },
];

const FALLBACK_PRODUCTS: Product[] = [
    { id: "deal-fallback-1", name: "Signature Burger", price: 1199, sortOrder: 1, inStock: 10, status: "ACTIVE", image: "/fiery-wok.png", categoryId: "fallback", category: { id: "fallback", CategoryName: "Featured" }, variants: [], createdAt: "", updatedAt: "" },
    { id: "deal-fallback-2", name: "Spicy Fries", price: 499, sortOrder: 2, inStock: 10, status: "ACTIVE", image: "/fiery-wok.png", categoryId: "fallback", category: { id: "fallback", CategoryName: "Sides" }, variants: [], createdAt: "", updatedAt: "" },
    { id: "deal-fallback-3", name: "Classic Pizza", price: 1499, sortOrder: 3, inStock: 10, status: "ACTIVE", image: "/fiery-wok.png", categoryId: "fallback", category: { id: "fallback", CategoryName: "Pizza" }, variants: [], createdAt: "", updatedAt: "" },
    { id: "deal-fallback-4", name: "Mango Cooler", price: 399, sortOrder: 4, inStock: 10, status: "ACTIVE", image: "/fiery-wok.png", categoryId: "fallback", category: { id: "fallback", CategoryName: "Drinks" }, variants: [], createdAt: "", updatedAt: "" },
];

const formatPrice = (price: number) => `PKR ${price.toLocaleString()}`;

export default function DealPage({ products }: { products: Product[] }) {
    const { addToCart } = useCart();
    const [activeDealId, setActiveDealId] = useState<string | null>(null);

    const deals = useMemo<DealCard[]>(() => {
        const availableProducts = products.filter((product) => product.status === "ACTIVE");
        const source = availableProducts.length > 0 ? availableProducts : FALLBACK_PRODUCTS;

        return DEALS.map((deal, index) => {
            const product = source[index % source.length];
            const salePrice = Math.round(product.price * (1 - deal.discount));

            return {
                id: `${product.id}-${deal.title}`,
                title: deal.title,
                label: deal.label,
                description: deal.description,
                originalPrice: product.price,
                salePrice,
                product: { ...product, price: salePrice },
            };
        });
    }, [products]);

    return (
        <main className="min-h-screen bg-[#FFFFFF] pb-14 pt-28 text-brand-dark sm:pt-32">
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-7 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">Exclusive Deals</p>
                        <h1 className="text-3xl font-black leading-tight sm:text-4xl">Special prices from our kitchen.</h1>
                        <p className="mt-3 max-w-xl text-base leading-7 text-gray-600">
                            Enjoy selected favorites at a little less, freshly prepared when you order.
                        </p>
                    </div>
                    <div className="w-fit rounded-[18px] border border-brand-primary/20 bg-white px-5 py-3 shadow-sm">
                        <p className="text-sm font-semibold text-gray-600">Limited offers</p>
                        <p className="text-lg font-black text-brand-primary">Up to 22% off</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
                    {deals.map((deal) => {
                        const isAvailable = deal.product.inStock > 0 && deal.product.status === "ACTIVE";

                        return (
                            <article
                                key={deal.id}
                                className="group flex min-w-0 flex-col !overflow-hidden rounded-[30px] border border-gray-200 bg-white shadow-[0_18px_55px_rgba(18,18,18,0.08)] transition-[box-shadow,transform] duration-300 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:shadow-[0_24px_70px_rgba(231, 28, 7,0.16)]"
                            >
                                <div className="product-card-image !relative flex !w-full shrink-0 items-center justify-center !overflow-hidden !rounded-t-2xl !bg-white">
                                    <Image
                                        src={deal.product.image || "/fiery-wok.png"}
                                        alt={deal.product.name}
                                        width={900}
                                        height={700}
                                        className="!h-full !w-full !object-cover !object-center"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            objectPosition: "center",
                                        }}
                                        unoptimized
                                    />
                                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent" />
                                    <span className="absolute left-4 top-4 rounded-[18px] bg-brand-primary px-3 py-1.5 text-sm font-semibold text-white shadow-md">
                                        {deal.label}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col p-5">
                                    <p className="text-sm font-semibold text-brand-primary">{deal.product.category?.CategoryName || "Featured"}</p>
                                    <h2 className="mt-1 text-xl font-black text-brand-dark">{deal.title}</h2>
                                    <p className="mt-2 text-sm leading-6 text-gray-600">{deal.description}</p>

                                    <div className="mt-5 border-y border-gray-100 py-3">
                                        <p className="text-sm font-semibold text-gray-500">Includes</p>
                                        <p className="mt-1 font-semibold text-brand-dark">{deal.product.name}</p>
                                    </div>

                                    <div className="mt-5">
                                        <p className="text-sm font-semibold text-gray-500">Deal price</p>
                                        <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                            <span className="text-2xl font-black text-brand-primary">{formatPrice(deal.salePrice)}</span>
                                            <span className="text-sm font-medium text-gray-400 line-through">{formatPrice(deal.originalPrice)}</span>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            addToCart(deal.product);
                                            setActiveDealId(deal.id);
                                        }}
                                        onPointerEnter={() => setActiveDealId(deal.id)}
                                        onPointerMove={() => setActiveDealId(deal.id)}
                                        onPointerLeave={() => setActiveDealId(null)}
                                        onMouseEnter={() => setActiveDealId(deal.id)}
                                        onMouseMove={() => setActiveDealId(deal.id)}
                                        onMouseLeave={() => setActiveDealId(null)}
                                        onFocus={() => setActiveDealId(deal.id)}
                                        onBlur={() => setActiveDealId(null)}
                                        disabled={!isAvailable}
                                        className={`relative z-10 mt-6 w-full touch-manipulation rounded-[18px] px-4 py-3 text-sm font-semibold text-white transition-[background-color,box-shadow,transform] duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45 ${
                                            activeDealId === deal.id
                                                ? "!bg-[#E71C07] !shadow-[0_10px_25px_rgba(231, 28, 7,0.40)]"
                                                : "!bg-white !text-brand-primary !border !border-brand-primary/20 !shadow-[0_10px_25px_rgba(231, 28, 7,0.10)]"
                                        }`}
                                    >
                                        {isAvailable ? "Add to Cart" : "Unavailable"}
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
