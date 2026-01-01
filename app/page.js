'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BenefitsBar from '@/components/BenefitsBar';
import FeaturedProducts from '@/components/FeaturedProducts';
import Collections from '@/components/Collections';
import BrandStory from '@/components/BrandStory';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import PromoBanner from '@/components/PromoBanner';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { products, collections } from '@/lib/products';

export default function Home() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('luxe-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let newCart;

    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(newCart);
    localStorage.setItem('luxe-cart', JSON.stringify(newCart));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header cartCount={cartCount} />
      <main>
        {/* 1. Hero - First impression & main message */}
        <Hero />

        {/* 2. Benefits - Immediate trust signals */}
        <BenefitsBar />

        {/* 3. Featured Products - Main reason users visit */}
        <FeaturedProducts products={products} onAddToCart={addToCart} />

        {/* 4. Promo Banner - Sale incentive after seeing products */}
        <PromoBanner />

        {/* 5. Shop by Collection - Alternative browsing */}
        <Collections collections={collections} />

        {/* 6. Testimonials - Social proof builds confidence */}
        <Testimonials />

        {/* 7. Why Choose Us - Brand trust */}
        <WhyChooseUs />

        {/* 8. Brand Story - For interested visitors */}
        <BrandStory />

        {/* 9. Newsletter - Final CTA */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
