import "@fontsource-variable/anybody/standard.css";
import "@fontsource-variable/instrument-sans/standard.css";
import "@fontsource-variable/jetbrains-mono/index.css";
import "./globals.css";

export const metadata = {
  title: "Shakil Ur Rehman — Full-Stack Engineer",
  description:
    "Full Stack Software Engineer specializing in backend architecture, scalable APIs, and Generative AI pipelines.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='28' fill='%23151935'/><circle cx='74' cy='26' r='9' fill='%23F5A524'/><text x='46%' y='58%' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-weight='900' font-size='46' fill='%23EEF0F6'>SR</text></svg>",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EEF0F6" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1022" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio_theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}if(t==='dark'){document.documentElement.classList.add('dark')}document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
