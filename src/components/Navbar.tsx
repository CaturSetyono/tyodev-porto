export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block">
              <div className="flex space-x-4">
                <a href="/." className="text-gray-900 dark:text-white">Home</a>
                <a href="/about" className="text-gray-900 dark:text-white">About</a>
                <a href="/portfolio" className="text-gray-900 dark:text-white">Portfolio</a>
                <a href="/contact" className="text-gray-900 dark:text-white">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
