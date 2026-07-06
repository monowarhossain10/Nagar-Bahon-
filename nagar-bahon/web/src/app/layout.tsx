import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nagar Bahon - Your Trusted Ride-Sharing Platform',
  description: 'Comfortable and affordable ride-sharing platform for Bangladesh',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
