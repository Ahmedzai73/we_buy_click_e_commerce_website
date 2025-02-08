export const metadata = {
    title: "Buyclik",
    description: "Welcome to Buyclik",
}

export default function RootLayout({
    children,
}: {
    
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}