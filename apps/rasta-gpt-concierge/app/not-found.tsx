import Link from 'next/link';

export default function NotFound() {
  return (
    <html>
      <head>
        <title>404 - Page Not Found</title>
        {/* You may want to import your main stylesheet here */}
        {/* <link rel="stylesheet" href="/global.css" /> */}
      </head>
      <body style={{ fontFamily: 'sans-serif', textAlign: 'center', paddingTop: '50px' }}>
        <h1>404 | Not Found</h1>
        <p>Could not find the requested resource.</p>
        <p>
          <Link href="/">Return Home</Link>
        </p>
      </body>
    </html>
  );
}
