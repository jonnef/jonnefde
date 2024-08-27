import Image from "next/image";
import Link from "next/link";
import HomeButton from "./components/buttons/Home";
import ThemeSwapButton from "./components/buttons/ThemeSwap";
import SettingsButton from "./components/buttons/Settings";
import MenuButton from "./components/buttons/Menu";
import NavbarComponent from "./components/Navbar";

export default function Home() {
  return (
    <main>
      <NavbarComponent headline={"Homepage"} />
    </main>
  );
}
