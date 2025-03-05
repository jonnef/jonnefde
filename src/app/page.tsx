import Image from "next/image";
import NavbarComponent from "./components/Navbar";

export default function Home() {
  return (
    <main content="width=device-width, initial-scale=1">
      <NavbarComponent headline={"Homepage"} />
      <div>
        <a className="card" href="/union">
          <figure>
            {/* <img src="/unionzweite.JPEG" /> */}
            <Image src={`/images/union.jpeg`} alt="Unionzweite Bild"
            width={1315}
            height={837}/>
          </figure>
        </a>
      </div>
    </main>
  );
}
