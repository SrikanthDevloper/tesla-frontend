export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-10">
      <div className="max-w-6xl mx-auto text-center">
        © {new Date().getFullYear()} Tesla Store. All rights reserved.
      </div>
    </footer>
  );
}