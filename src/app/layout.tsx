import type { Metadata } from "next";
import "@/assets/styles/globals.scss";
import "@/assets/styles/variables.scss";
import localFont from 'next/font/local';
import MobileNotAvailable from "@/components/MobileNotAvailable";
import { AppProvider } from "@/context";

export const metadata: Metadata = {
  title: "Trading bot",
  description: "Welcome to Bandit City, the digital realm where privacy isn't just an option, it's the foundation.",
};

// Futura local font
const Futura = localFont({
  src: [
    {
      path: '../assets/fonts/FuturaLight.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/FuturaMedium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/FuturaBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/FuturaExtraBold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Futura.className}>
        <AppProvider>
          {children}

          {/* Not available for mobile devices */}
          <MobileNotAvailable />
        </AppProvider>
      </body>
    </html>
  );
}
