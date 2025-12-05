import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">

            {/* Sticky Header */}
            <Header className="sticky top-0 z-50" />

            {/* Main content */}
            <main className="flex-grow pt-24"> {/* Adjust pt-24 based on header height */}
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainLayout;
