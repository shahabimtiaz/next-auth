import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "../../components/Header/index";
import { getServerSession } from "next-auth";
import AuthProvider from "../../util/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const poppins = Poppins({ subsets: ["latin"],weight:'500' });

export const metadata = {
  title: "next-auth",
  description: "NextJS Authentication",
};
const session = await getServerSession();
export default async function RootLayout({ children }) {
  
  return (
    <html lang="en">
      
      <body className={poppins.className}>
      
      <AuthProvider session={session}>
      <Header/> 
      {children}
      <ToastContainer/>
      </AuthProvider>
        
        </body>
    </html>
  );
}
