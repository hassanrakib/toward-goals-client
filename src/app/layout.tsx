import { sora } from "@/config/fonts";
import Providers from "@/providers";
import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "Toward Goals",
  description: "A Productivity Booster",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sora.className} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
