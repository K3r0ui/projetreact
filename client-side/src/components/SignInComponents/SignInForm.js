import React from 'react';

function SigninForm({ label, type, onChange }) {
   return (
      <div className=' mb-3'>
         <label className='form-label'>{label}</label>
         <div className='input-group'>
            <span className='input-group-text' id='basic-addon1'>
               <i className='fa-solid fa-user'></i>
            </span>
            <input
               type={type}
               className='form-control'
               onChange={onChange}
               required
            />
         </div>
      </div>
   );
}

export default SigninForm;
