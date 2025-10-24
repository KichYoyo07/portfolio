import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Kich Website',
    description: 'Portafolio de Kich',
    generator: 'v0.dev',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='es'>
            <body>{children}</body>
        </html>
    );
}
