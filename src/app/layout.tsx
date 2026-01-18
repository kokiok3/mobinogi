import type { Metadata } from "next";
import Gnb from "components/Gnb"

import "styles/global.css"

export const metadata: Metadata = {
  title: "모비랭크",
  description: "모비랭크에서는 서버종합 랭킹을 한눈에 볼 수 있어요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html >
      <body className="font-['Pretendard']">
        <Gnb />
        {children}
      </body>
    </html>
  );
}
