import Providers from "@/lib/providers";
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
