import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import {useParams} from "react-router-dom";

function UserPage() {
  const {userName} = useParams();

  const [userInfos, setUserInfos] = useState({});

  console.log(userName);
  console.log(userInfos);

  useEffect(() => {
    axios.get(`https://api.github.com/users/${userName}`)
      .then(res => setUserInfos(res.data))
      .catch(err => console.log(err));

  }, []);

  return(
    <div>
      <h5>{userInfos.name}</h5>
    </div>
  );
}
export default UserPage;