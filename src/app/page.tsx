import Image from "next/image";
import Link from "next/link";
import HomeButton from "./components/buttons/Home";
import ThemeSwapButton from "./components/buttons/ThemeSwap";
import SettingsButton from "./components/buttons/Settings";
import MenuButton from "./components/buttons/Menu";

export default function Home() {
  return (
    <main>
      <div className="navbar bg-base-100" data-theme="dark">
        <div className="navbar-start">
          <HomeButton />
          <MenuButton />
        </div>
        <div className="navbar-center lg-flex">
          Homepage
        </div>
        <div className="navbar-end"><SettingsButton /></div>
      </div>

      <button className="btn" data-theme="cyberpunk"><Link href="/kanban">Kanban</Link></button>
    </main>
  );
}
