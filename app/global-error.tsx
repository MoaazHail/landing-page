"use client";

import "./globals.css";

// Replaces the root layout when it fails, so it cannot rely on i18n context:
// the copy is shown in both languages.
export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex min-h-dvh items-center justify-center bg-primary p-6 text-center text-white">
        <main className="max-w-md">
          <h1 className="text-h2 font-bold">حدث خطأ غير متوقع</h1>
          <p className="mt-2 text-white/80" lang="en" dir="ltr">
            Something went wrong.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            className="clip-corner mt-8 bg-white px-8 py-3.5 font-semibold text-primary"
          >
            إعادة المحاولة · Try again
          </button>
        </main>
      </body>
    </html>
  );
}
