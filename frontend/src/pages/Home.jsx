import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import tracker from "../assets/tracker.png";

function Home() {
  return (
    <div className="bg-white max-h-screen max-w-screen">
      <main>
        {/* Hero section */}
        <div className="overflow-hidden sm:pt-12 lg:relative lg:py-24">
          <div className="mx-auto max-w-md sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
            <div>
              <div>
                <img className="mx-auto h-32 w-auto" src={logo} alt="Piggy" />
              </div>
              <div className="mt-20">
                <div className="mt-6 sm:max-w-xl">
                  <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                    Une application pour mieux suivre vos dépenses
                  </h1>
                  <p className="mt-6 text-xl text-gray-500">
                    Vous finissez tous les mois en rouge sans jamais compréndre
                    quand ou comment votre argent est parti ?
                  </p>
                </div>
                <Link to="/login">
                  <div className="my-8 flex justify-center sm:justify-start">
                    <div className="block w-3/6 rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-600 sm:px-10 text-center">
                      Se connecter
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
            <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12">
                <img
                  className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                  src={tracker}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
