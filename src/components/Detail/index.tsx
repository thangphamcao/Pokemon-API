import { PokemonDetail } from '../../interface';

interface Props {
    pokemonDetail: PokemonDetail;
    checkOpen: boolean;
    setCheckOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Detail = (props: Props) => {
    const { pokemonDetail, setCheckOpen } = props;

    return (
        <div className="z-50 fixed top-1/3 left-1/3 bg-red-200 block w-1/3 h-64 flex">
            <div className="w-1/5 block rounded-lg bg-red-400 m-4 p-4 flex  justify-center items-center flex-col flex-1">
                <div className="relative overflow-hidden bg-cover bg-no-repeat">
                    <img className="rounded-t-lg" src={pokemonDetail.sprites.front_default} alt="" loading="lazy" />
                </div>
                <div className="p-6">
                    <p className="text-yellow-400 dark:text-neutral-200 text-xl cursor-pointer hover:text-black">
                        {pokemonDetail.name}
                    </p>
                </div>
            </div>

            <div className="flex-1 flex justify-center flex-col items-center">
                <div className=" text-center text-2xl "> Skills </div>
                {pokemonDetail.abilities?.map((item, index) => (
                    <div className="p-6" key={index}>
                        <p className="text-xl">{item.ability.name}</p>
                    </div>
                ))}
            </div>

            <div>
                <button onClick={() => setCheckOpen(false)}>&#10006;</button>
            </div>
        </div>
    );
};

export default Detail;
