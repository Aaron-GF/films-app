import { Inter, Roboto_Mono } from 'next/font/google'
import "@/styles/globals.css";  

import Navbar from '@/components/Navbar/Navbar'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
 
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

export const metadata = {
  title: "Filmix",
  description: "Aplicación para buscar películas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${roboto_mono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
