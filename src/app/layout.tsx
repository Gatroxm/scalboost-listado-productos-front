// src/app/layout.tsx
"use client";

import '../styles/globals.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <title>My Products App</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default Layout;
