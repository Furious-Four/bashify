import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AllMenues = (venueId) => {
  const [menues, setMenues] = useState([]);
  const getMenuData = async() => {
    const menuData = await axios.get(`/api/venue/${venueId}`);
    console.log(menuData);
  }

  useEffect(()=> {
    if (menues.length === 0) {
      getMenuData();
    }
  })

  return (
    <div>
      {menues.map(menu => {
        return (
          <div>
            {menu.name}
            </div>
        )
      })}
    </div>
  )


}

export default AllMenues;
