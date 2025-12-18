export const metadata = {
    title: "Flipper Game",
    description: "Sandwich & Shoe Toss Game",
};


export default function RootLayout({ children }) {
    return (
    <html lang="en">
        <body>{children}</body>
    </html>
  );
}