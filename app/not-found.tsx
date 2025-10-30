import Link from "next/link";
import { GradientBackground } from "@/components/GradientBackground";

export default function NotFound() {
  return (
    <GradientBackground>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl font-bold mb-4 text-accent">404</h1>
          <p className="text-xl text-gray-300 mb-8">Page not found</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-accent/20 border border-accent/50 rounded-xl text-accent font-semibold hover:bg-accent/30 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </GradientBackground>
  );
}

