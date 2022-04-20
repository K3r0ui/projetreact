import React, { useEffect } from 'react';
import { refuseInvitation } from '../../services/invitation.service';
import { useSearchParams } from 'react-router-dom';
import { message } from 'antd';

export default function Refused() {
   const [searchParams] = useSearchParams();
   const idJ = searchParams.get('idjoueur');
   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await refuseInvitation(idJ);
         } catch (error) {
            console.error(error.response);
            message.error(error.response.data);
         }
      };
      fetchData();
   }, []);

   return <h2>refusing the invitation...</h2>;
}
