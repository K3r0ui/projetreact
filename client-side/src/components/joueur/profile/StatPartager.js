import React, { useEffect, useState } from 'react'
import { getStatPartager } from '../../../services/joueur.service';

export default function StatPartager() {

    const [stats, setStats] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getStatPartager();
                setStats(res)
            } catch (error) {
                console.log("error");
            }

        };
        fetchData();
    }, [])
    return (
        <>
            {stats && (
                stats.map((stat) => (
                    <>


                        <div className='col-sm-10'>
                            <h6>Titre: </h6>
                            <p>{stat.statistique.title}</p>
                        </div>
                        <div className='col-sm-10'>
                            <h6>Description: </h6>
                            <p>{stat.statistique.description}</p>
                        </div>

                        <div className='col-sm-10'>
                            <h6>Lien: </h6>
                            <a href={stat.statistique.lien} target='_blank'>{stat.statistique.lien}</a>
                        </div>

                        <div className='col-sm-10'>
                            <h6>Type: </h6>
                            <p>{stat.statistique.type}</p>
                        </div>

                        <div className='col-sm-10'>
                            <h6>values: </h6>
                            <p>{stat.valeur} ({stat.statistique.unite})</p>
                        </div>

                        <hr />
                    </>
                ))
            )

            }
        </>
    )
}
