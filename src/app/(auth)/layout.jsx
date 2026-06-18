// import Navbar from '@/components/Navbar'; // Assuming you have a Navbar component
// import Footer from '@/components/Footer'; // Assuming you have a Footer component

export default function PublicLayout({ children }) {
    return (
        <div className="public-wrapper">
            {/* <Navbar /> */}
            <h1>Navbar</h1>
            {children}
            <h1>Footer</h1>
            {/* <Footer /> */}
        </div>
    );
}