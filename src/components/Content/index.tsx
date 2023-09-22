import { Fragment, useState } from 'react';
import { PokemonDetail } from '../../interface';
import Detail from '../Detail';

interface Props {
    pokemons: PokemonDetail[];
}

function Content(props: Props) {
    const { pokemons } = props;

    const [detail, setDetail] = useState<PokemonDetail>();

    const [checkOpen, setCheckOpen] = useState<boolean>(false);

    const handleViewDetail = (item: PokemonDetail) => {
        setDetail(item);
        setCheckOpen(true);
    };

    return (
        <Fragment>
            <div className="flex flex-row flex-wrap justify-center items-center">
                {pokemons.map((item, index) => (
                    <div
                        key={index}
                        className="w-1/5 block rounded-lg bg-red-400 m-4 p-4 flex  justify-center items-center flex-col"
                    >
                        <div className="relative overflow-hidden bg-cover bg-no-repeat">
                            <img className="rounded-t-lg" src={item.sprites.front_default} alt="" loading="lazy" />
                        </div>
                        <div className="p-6" onClick={() => handleViewDetail(item)}>
                            <p className="text-yellow-400 dark:text-neutral-200 text-xl cursor-pointer hover:text-black">
                                {item.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {checkOpen && detail && <Detail pokemonDetail={detail} setCheckOpen={setCheckOpen} checkOpen={checkOpen} />}
        </Fragment>
    );
}

export default Content;
