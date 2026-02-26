"use client";

import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Provider } from 'react-redux';
import { store } from '../store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Provider store={store}>
          <Header />

          <main>
            {children}
          </main>

          <Footer />
        </Provider>
      </body>
    </html>
  );
}