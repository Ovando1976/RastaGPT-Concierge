// app/layout.tsx (Server Component by default)
import  AppProvider  from "./providers.client"; // Importing the client component is OK

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // DO NOT call getFirebaseApp() here!
  
  return (
    <html>
      <body>
        <AppProvider> // Rendering the client component is OK
          {children}
        </AppProvider>
      </body>
    </html>
  );
}