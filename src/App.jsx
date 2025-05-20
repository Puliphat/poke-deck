import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import FavPoke from "./component/FavPoke";
import ReactLoading from 'react-loading';
import { FaArrowLeft, FaArrowRight, FaHeart } from 'react-icons/fa';

function App() {
  const [poke, setPoke] = useState("");
  const [loading, setLoding] = useState(false);
  const [error, setError] = useState("");
  const [number, setNumber] = useState(1);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    let abortController = new AbortController();

    const loadPoke = async () => {
      try {
        setLoding(true);
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${number}`,
          {
            signal: abortController.signal,
          }
        );

        setPoke(response.data);
        setError("");
      } catch (error) {
        setError("Something went wrong", error);
      } finally {
        setLoding(false);
      }
    };

    loadPoke();

    return () => abortController.abort();
  }, [number]);

  const prevPoke = () => {
    if (number > 1) {
      setNumber((number) => number - 1);
    }
  };

  const nextPoke = () => {
    setNumber((number) => number + 1);
  };

  const addFav = () => {
    if (!fav.some(item => item.id === poke.id)) {
      setFav((oldState) => [...oldState, poke]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-300 to-pink-400 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 rounded-lg p-4 mb-8 shadow-lg">
          <h1 className="text-4xl font-bold text-center text-black">Pokémon Decks</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pokemon Card Section */}
          <div className="bg-white/80 rounded-lg p-6 shadow-lg">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <ReactLoading type="spinningBubbles" color="#0284C7" height={50} width={50} />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold capitalize text-black">{poke?.name}</h2>
                  <button
                    onClick={addFav}
                    className="text-pink-500 hover:text-pink-700"
                    title="Add to favorites"
                  >
                    <FaHeart size={24} />
                  </button>
                </div>

                <div className="flex justify-center">
                  <img
                    src={poke?.sprites?.other?.home?.front_default}
                    alt={poke?.name}
                    className="w-48 h-48 object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-black">Abilities:</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {poke?.abilities?.map((abil, idx) => (
                      <li key={idx} className="bg-gray-100 rounded px-3 py-1 text-sm capitalize text-black">
                        {abil.ability?.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={prevPoke}
                    disabled={number <= 1}
                    className={`flex items-center gap-2 px-4 py-2 rounded transition-all duration-300 ${
                      number <= 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600 hover:scale-110'
                    } text-white `}
                  >
                    <FaArrowLeft /> Previous
                  </button>
                  <span className="text-black font-bold">#{number}</span>
                  <button
                    onClick={nextPoke}
                    className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded transition-all duration-300 hover:scale-110"
                  >
                    Next <FaArrowRight />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Favorites Section */}
          <div className="bg-white/80 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-black">Your Favorite Pokémon</h2>
            {fav.length > 0 ? (
              <FavPoke fav={fav} />
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <FaHeart size={48} className="mb-4 text-pink-500" />
                <p className="text-black">Add your favorite Pokémon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
