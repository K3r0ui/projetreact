import { DatePicker, Button } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Seance from '../../components/SeanceComponents/Seance/Seance';
import { getAllSeancesJ } from '../../services/seance.service';

const { RangePicker } = DatePicker;

export default function SeanceJoueurPage() {
   const [seances, setSeances] = useState([]);

   const fechallData = async () => {
      try {
         return await getAllSeancesJ();
      } catch (error) {
         console.log('err', error.message);
      }
   };

   useEffect(() => {
      const fetchData = async () => {
         const data = await fechallData();
         setSeances(data);
      };
      fetchData();
   }, []);

   const onChangeCalender = async (val) => {
      if (val[0] !== null && val[1] !== null) {
         try {
            const data = await fechallData();

            let seancesClone = [...data];
            seancesClone = seancesClone.filter(
               (s) =>
                  moment(s.date).isAfter(val[0], 'day') &&
                  moment(s.date).isBefore(val[1], 'day')
            );
            setSeances(seancesClone);
         } catch (error) {
            console.log('err', error.message);
         }
      }
   };

   const onChangeDateToday = async () => {
      const data = await fechallData();
      let seancesClone = [...data];
      seancesClone = seancesClone.filter((s) =>
         moment(s.date).isSame(new Date(), 'day')
      );
      setSeances(seancesClone);
   };

   return (
      <div className='container mt-2'>
         <h3> filtrer par date : </h3>{' '}
         <RangePicker onCalendarChange={onChangeCalender} />
         <Button className='m-2' onClick={onChangeDateToday}>
            Afficher les seances D'aujourd'hui
         </Button>
         <Button
            className='m-2'
            onClick={async () => {
               const data = await fechallData();
               setSeances(data);
            }}>
            all Data
         </Button>
         <table className='table mt-3'>
            <thead>
               <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Titre</th>
                  <th scope='col'>Date</th>
                  <th scope='col'>Lieu</th>
                  <th scope='col'>Program</th>
               </tr>
            </thead>
            <tbody>
               {seances.map((seance, index) => (
                  <Seance key={seance._id} index={index} seance={seance} />
               ))}
            </tbody>
         </table>
      </div>
   );
}
