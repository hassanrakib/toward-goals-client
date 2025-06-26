import { sora } from "@/config/fonts";
import Providers from "@/providers";
import type { Metadata } from "next";
import "./global.css";
import { Container } from "@chakra-ui/react";

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
        <Providers>
          {/* it takes all of the width of body */}
          <Container bgColor="gray.100" fluid p="0">
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
