// import Navbar from '@/components/Navbar'; // Assuming you have a Navbar component
// import Footer from '@/components/Footer'; // Assuming you have a Footer component

import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";

export default function PublicLayout({ children }) {
    return (
        <div className="public-wrapper">
            {/* <Navbar /> */}
            <Navbar />
            {children}
            <Footer />
            {/* <Footer /> */}
        </div>
    );
}