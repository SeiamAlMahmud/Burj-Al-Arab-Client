import * as React from 'react';

import { Button } from '@mui/material';
import BasicDateRangePicker from '../components/BasicDateRangePicker';
import { bookingApi } from '../Context-API/WraperContext';
const HomePage = () => {
 const {handleCheckIn} = React.useContext(bookingApi)
 
  return (
    <div className='bg-cover bg-no-repeat h-[500px] w-full mx-auto flex justify-center items-center text-center bg-gray-600' style={{backgroundImage: "url('https://gsmproject.com/image/1/1602/0/uploads/projects/images/gsm-project-burj-khalifa-at-the-top-visitor-experience-observation-deck-skyscraper-tall-tower_design-1695154846.jpg')"}}>
      
      <div className="px-20 py-6 flex flex-col gap-5 backdrop-blur-sm shadow-md rounded-sm text-white">
<BasicDateRangePicker />
   <div className='self-center justify-center mt-10'>

<Button onClick={handleCheckIn} variant="contained" color="success">
        Success
      </Button>
   </div>
      </div>
    </div>
  )
}

export default HomePage