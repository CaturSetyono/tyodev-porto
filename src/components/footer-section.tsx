const FooterSection = () => {
  return (
    <footer className="bg-slate-800 py-8">
      <div className="container mx-auto px-6 max-w-6xl text-center">
        <p className="text-slate-400">
          &copy; {new Date().getFullYear()} Catur Setyono. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
