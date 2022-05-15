import React, { useEffect, useState } from 'react'
import { getCompPartager } from '../../../services/joueur.service';

import { Rate } from 'antd';

export default function CompPartager() {

    const [comps, setComps] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCompPartager();
                setComps(res)
            } catch (error) {
                console.log("error");
            }

        };
        fetchData();
    }, [])
    return (
        <>
            {comps && (
                comps.map((comp) => (
                    <>


                        <div className='col-sm-10'>
                            <h6>Titre: </h6>
                            <p>{comp.title}</p>
                        </div>
                        <div className='col-sm-10'>
                            <h6>Description: </h6>
                            <p>{comp.description}</p>
                        </div>
                        <div className='col-sm-10'>
                            <h6>Lien: </h6>
                            <a href={comp.link} target="_blank">{comp.link}</a>
                        </div>
                        <div>
                            <Rate disabled value={comp.stars} />
                        </div>

                        <hr />
                    </>
                ))
            )

            }
        </>
    )
}
