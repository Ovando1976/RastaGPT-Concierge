import { notFound } from 'next/navigation';

export default function NotFound() {
return (
<html>
<head>
<title>404 - Not Found</title>
</head>
<body>
<h1>404 - Page Not Found</h1>
<p>Could not find requested resource.</p>
<p>The content is not available.</p>
</body>
</html>
);
}
