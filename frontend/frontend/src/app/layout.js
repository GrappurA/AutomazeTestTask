import { Rowdies } from "next/font/google";
import "./globals.css";
import { redirect } from "next/dist/server/api-utils";
import Header from "./ReactComponents/Header";
import AuthGuard from "./ReactComponents/AuthGuard";
import { supabase } from "../../lib/supabase";

const rowdies = Rowdies({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: '400'
});

export const metadata = {
  title: "All Done",
  description: "A to-do list application",

};

function handleLogoClick() {
  redirect('/')
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >

      <body className={`bg-[#9A8C98] min-h-screen flex flex-col ${rowdies.className} overflow-x-hidden scroll-smooth`}>

        <AuthGuard>
          <div className="h-[10%]">
            <Header />
          </div>

          <div className="p-1 h-full">
            {children}
          </div>
        </AuthGuard>

      </body>
    </html >
  );
}
