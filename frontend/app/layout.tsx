import Navbar from "@/components/layout/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
            <body style={{ margin: 0 }}>
                <Navbar />
                {children}
            </body>
    </html>
  );
}
