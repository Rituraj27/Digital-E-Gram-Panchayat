import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <div className="toaster-container">
          <Toaster />
        </div>
      </body>
    </html>
  )
}
