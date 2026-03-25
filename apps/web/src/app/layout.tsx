import type { Metadata } from "next";
import { Suspense } from "react";
import Gnb from "@/components/Gnb"

import "@/styles/global.css"
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: '모비랭크 | 마비노기 모바일 서버 통합 랭킹',
  description: '마비노기 모바일 서버 통합 랭킹 TOP500을 확인해 보세요.',
  applicationName: '모비랭크',
  keywords: ['마비노기 모바일 랭크',
    '마비노기 모바일 순위',
    '마비노기 모바일 랭킹',
    '마비노기 모바일 전투력',
    '마비노기',
    '마비노기 모바일',
    '모비노기',
    '모비랭크',
    '모비랭킹',
    '모비랭커',
    '마비노기 랭킹',
    '마비노기 랭크',
    '마비노기 순위',
    '마비노기 전투력',
    '마비노기 매력',
    '마비노기 생활',
    '마비노기 통합',
    '마비노기 서버통합',
    '마비노기 전투력 랭킹',
    '마비노기 매력 랭킹',
    '마비노기 생활 랭킹',
    '마비노기 통합 랭킹',
    '마비노기 서버통합 랭킹',
    '마비노기 전투력 순위',
    '마비노기 매력 순위',
    '마비노기 생활 순위',
    '마비노기 통합 순위',
    '마비노기 서버통합 순위',
    '모비노기 랭크',
    '모비노기 순위',
    '모비노기 전투력',
    '모비노기 매력',
    '모비노기 생활',
    '모비노기 전투력 랭킹',
    '모비노기 매력 랭킹',
    '모비노기 생활 랭킹',
    '모비노기 전투력 순위',
    '모비노기 매력 순위',
    '모비노기 생활 순위'
  ],
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
  other: {
    'naver-site-verification': '746fe0f32bd5f487bfa431cbd49fe629f720b33d',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "모비랭크",
              url: "https://mobirank.vercel.app",
            }),
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/favicon.ico"
          sizes="180x180"
        />
        <link
          rel="apple-touch-icon"
          href="/favicon.ico"
          sizes="360x360"
        />
      </head>
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
