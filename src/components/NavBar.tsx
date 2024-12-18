import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">
          Sales Solution Generator
        </Link>
        
        <div className="flex gap-4">
          <Link to="/pricing" className="hover:text-blue-600">
            Pricing
          </Link>
          
          <SignedIn>
            <Link to="/account" className="hover:text-blue-600">
              Account
            </Link>
            <SignOutButton />
          </SignedIn>
          
          <SignedOut>
            <Link to="/sign-in" className="hover:text-blue-600">
              Sign In
            </Link>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}