'use client';

import { useCart } from '@/components/context/CartContext';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function FloatingCheckout() {
  const { state, getItemCount } = useCart();
  const itemCount = getItemCount();
  const total = state.total;

  // Don't show if cart is empty
  if (itemCount === 0) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
    }).format(price);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <Link
        href="/checkout"
        className="flex items-center space-x-4 bg-blue-600 text-white px-6 py-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105 animate-bounce-subtle"
      >
        <div className="relative">
          <ShoppingCartIcon className="h-6 w-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {itemCount}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {itemCount} item{itemCount > 1 ? 's' : ''}
          </span>
          <span className="text-lg font-bold">
            {formatPrice(total)}
          </span>
        </div>
        <span className="text-sm font-medium">
          Checkout →
        </span>
      </Link>
    </div>
  );
}