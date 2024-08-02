'use client';
import { UserProvider } from '../context/UserContext';
import { usePathname } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  return (
    <UserProvider>
      <html lang="en">
        <body>
          {!isLoginPage && <Header/>}
          <div className='flex min-h-screen flex-col justify-between px-4'>
            <main>{children}</main>
          </div>
          {!isLoginPage && <Footer/>}
        </body>
      </html>
    </UserProvider>
  );
}
