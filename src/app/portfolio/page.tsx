export default function Portfolio() {
  return (
    <main>
      <div className="bg-gradient-to-r from-green-400 to-blue-500 h-screen">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-white text-5xl font-bold">Portofolio Saya</h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
          <p className="text-white">Dibuat dengan Next.js dan Tailwind CSS</p>
          <p className="text-white">Hubungi saya di: <a href="mailto:email@example.com" className="underline">email@example.com</a></p>
        </div>
      </div>
    </main>
  );
}