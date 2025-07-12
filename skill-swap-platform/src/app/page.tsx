export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white text-black">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">🎉 Welcome to Skill Swap</h1>
        <p className="text-lg text-gray-600">Connect. Learn. Share Skills.</p>
        <a
          href="/profile"
          className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Get Started →
        </a>
      </div>
    </main>
  );
}
