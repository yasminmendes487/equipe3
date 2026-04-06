import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-background border-b p-4 flex justify-center gap-6">
      
      <Link to="/" className="hover:opacity-70">
        Home
      </Link>

      <Link to="/events" className="hover:opacity-70">
        Eventos
      </Link>

      <Link to="/contact" className="hover:opacity-70">
        Contato
      </Link>

    </header>
  );
}