import type { Metadata } from "next";
import { Suspense } from "react";
import Gnb from "@/components/Gnb"

import "@/styles/global.css"
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: '모비랭크 | 마비노기 모바일 서버 통합 랭킹',
  description: '마비노기 모바일 서버 통합 랭킹 TOP500을 확인해 보세요.',
  applicationName: '모비랭크',
  keywords: ['모비노기', '모비랭크', '모비랭킹', '모비랭커', '마비노기', '마비노기 모바일', '랭킹', '랭크', '순위', '전투력', '매력', '생활', '통합', '서버통합'],
  authors: [{ name: '모비랭크' }, { name: 'kkokkiok3' }],
  creator: '모비랭크',
  publisher: '모비랭크',
  openGraph: {
    title: '모비랭크 | 마비노기 모바일 서버 통합 랭킹',
    description: '마비노기 모바일 서버 통합 랭킹 TOP500을 확인해 보세요.',
    url: 'https://mobirank.vercel.app',
    siteName: '모비랭크',
    type: 'website',
    locale: 'ko_KR'
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: '모비랭크',
    description: '마비노기 모바일 서버 통합 랭킹 TOP500을 확인해 보세요.',
    creator: '모비랭크',
  },
  // <meta name="google-site-verification content="값" />으로 변환된다.
  verification: {
    google: 'Is9iasnULYAvarhpjC0hAM1OclRcLVnkpo-co2E81Yg',
  },
  // <meta name="naver-site-verification" content="값" />으로 변환된다.
  // other: {
  //   'naver-site-verification': '값',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html >
      <body className="font-['Pretendard']">
        <Suspense fallback={<nav className="sticky top-0 z-2 flex items-center mx-auto justify-center w-full h-55 bg-white" />}>
          <Gnb />
        </Suspense>
        <div className="relative z-1">
          {children}
        </div>
        <Footer></Footer>
      </body>
    </html>
  );
}
