import Link from "next/link";

// Requests the locale proxy doesn't match (e.g. unknown files) land here,
// outside any locale layout, so this page renders its own document.
export default function RootNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex min-h-dvh items-center justify-center bg-primary p-6 text-center text-white">
        <main>
          <h1 className="text-h2 font-bold">الصفحة غير موجودة</h1>
          <p className="mt-2 text-white/80" lang="en" dir="ltr">
            Page not found
          </p>
          <Link href="/" className="clip-corner mt-8 inline-block bg-white px-8 py-3.5 font-semibold text-primary">
            العودة إلى الرئيسية
          </Link>
        </main>
      </body>
    </html>
  );
}
