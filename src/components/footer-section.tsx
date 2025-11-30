import React from "react";

const FooterSection = () => {
  return (
    <footer className="py-8 bg-slate-950 border-t border-white/10 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/60 text-sm">
            © {new Date().getFullYear()} TyoDev. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/60 hover:text-cyan-300 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-cyan-300 transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
