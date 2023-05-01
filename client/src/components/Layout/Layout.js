import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="description" content={description} />
                    <meta name="keywords" content={keywords} />
                    <meta name="author" content={author} />
                    <title>{title}</title>
                </Helmet>
            </HelmetProvider>
            <Header />
            <main style={{ minHeight: "80vh" }}>
                <Toaster />

                {children}
            </main>
            <Footer />
        </div>
    );
};

Layout.defaultProps = {
    title: "Gerald e-Shop - shop now",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "Gerald dev",
};

export default Layout;
