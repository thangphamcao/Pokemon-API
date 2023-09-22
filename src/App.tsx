import Content from './components/Content';
import { useEffect, useState } from 'react';
import { Pokemons, Pokemon } from './interface';

function App() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);

    const [nextURL, setNextURL] = useState<string>('');

    const [checkLoading, setCheckLoading] = useState(false);

    useEffect(() => {
        const getListPokemon = async () => {
            await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
                .then((res) => res.json())
                .then((data) => {
                    setNextURL(data.next);
                    data.results.map(async (pokemon: Pokemons) => {
                        await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                            .then((res) => res.json())
                            .then((data) => {
                                setPokemon((p) => [...p, data]);
                                setCheckLoading(false);
                            })
                            .catch((err) => console.log(err));
                    });
                })
                .catch((err) => console.log(err));
        };
        getListPokemon();
    }, []);

    useEffect(() => {
        if (checkLoading) {
            const getNextPokemons = async () => {
                await fetch(nextURL)
                    .then((res) => res.json())
                    .then((data) => {
                        setNextURL(data.next);
                        data.results.map(async (pokemon: Pokemons) => {
                            await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                                .then((res) => res.json())
                                .then((data) => setPokemon((p) => [...p, data]))
                                .catch((err) => console.log(err));
                        });
                    });
            };
            getNextPokemons();
            setCheckLoading(false);
        }
        return;
    }, [nextURL, checkLoading]);

    const handleLoadMore = () => {
        setCheckLoading(true);
    };

    return (
        <div className="App">
            <h1 className="mb-4 mt-4 text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-6xl text-center">
                POKEMON API
            </h1>
            <div className="container mx-auto px-4 ">
                <Content pokemons={pokemon} />
                <div className="flex justify-center relative">
                    <button
                        className="bg-red-400 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                        onClick={handleLoadMore}
                    >
                        {checkLoading ? 'Loading...' : 'MORE'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
