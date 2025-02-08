import { inter } from "@/config/fonts";
import Providers from "@/providers";
import type { Metadata } from "next";

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
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
