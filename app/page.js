'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Collections from '@/components/Collections';
import Newsletter from '@/components/Newsletter';
import PromoBanner from '@/components/PromoBanner';
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
        <Hero />
        <FeaturedProducts products={products} onAddToCart={addToCart} />
        <PromoBanner />
        <Collections collections={collections} />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
