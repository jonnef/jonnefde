import Image from "next/image";
import NavbarComponent from "./components/Navbar";

export default function Home() {
  return (
    <main>
      <NavbarComponent headline={"Homepage"} />
      <div>
        <div className='container mx-auto'>
          <div className='grid grid-cols-3'>
            <div></div>
            <div>
              <a className="card" href="/union">
                  <figure>
                    <Image src={`/images/union.jpeg`} alt="Unionzweite Bild"
                      width={1315}
                      height={837}/>
                  </figure>
                </a>
              </div>
            <div></div>
          </div>
        </div>
      </div>
    </main>
  );
}
