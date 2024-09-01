import type { Metadata, Viewport } from "next";
import { Concert_One, Exo_2, Inter, Noto_Sans_Hatran } from "next/font/google";
import "../globals.css";
import Providers from "@/components/Providers/Providers";
import RootHeader from "@/components/RootHeader";

const noto = Noto_Sans_Hatran({subsets:["hatran"],weight:["400"]})

const APP_NAME = "TODOS";
const APP_DEFAULT_TITLE = "TODOS";
const APP_TITLE_TEMPLATE = "TODOS";
const APP_DESCRIPTION = "Easily manage your todos!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    startupImage: ["/icon-512x512.png"],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <Providers>
          <RootHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
