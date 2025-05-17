import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen dna-bg pb-20 flex flex-col">
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
