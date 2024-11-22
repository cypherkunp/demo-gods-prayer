import { Link } from "@remix-run/react";

export function Footnote() {
  return (
    <footer className="w-full py-4 px-4 text-center text-sm text-gray-400">
      <p className="space-x-1">
        <span>Handmade by</span>
        <Link
          to="https://www.devvrat.cc/"
          className="text-amber-500 hover:text-amber-400 transition-colors decoration-amber-500 underline underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Devvrat
        </Link>
        <span>•</span>
        <span>In collaboration with</span>
        <Link
          to="https://v0.dev"
          className="text-purple-500 hover:text-purple-400 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          v0
        </Link>
        <span>+</span>
        <Link
          to="https://midjourney.com"
          className="text-purple-500 hover:text-purple-400 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Midjourney
        </Link>
        <span>+</span>
        <Link
          to="https://suno.ai"
          className="text-purple-500 hover:text-purple-400 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Suno AI
        </Link>
      </p>
    </footer>
  );
}
