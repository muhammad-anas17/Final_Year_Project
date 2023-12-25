import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Cdashboard = () => {
    const { userId } = useParams();
    console.log("Id is:", { userId })
    const [userData, setUserData] = useState(null);





  return (
    <div>
      <h2>College Dashboard</h2>
      
    </div>
  )
}

export default Cdashboard
