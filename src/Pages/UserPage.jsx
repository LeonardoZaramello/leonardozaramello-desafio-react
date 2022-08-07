import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import '../Styles/UserPageStyle.css';
import stacksColors from '../Utils/StacksColors';
import gitforkedSvg from '../Images/forked.svg';
import scaleSvg from '../Images/scale.svg';
import convertTime from '../Utils/ConvertDateTime';

function UserPage() {
  const {userName} = useParams();

  const [userInfos, setUserInfos] = useState({});
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [userStars, setUserStars] = useState([]);
  const [userRepositories, setUserRepositories] = useState([]);

  console.log('renderizou');

  useEffect(() => {

    const fetchApi = async () => {
      const [user, followers, following, stars, repositories] = await Promise.all([
        axios.get(`https://api.github.com/users/${userName}`),
        axios.get(`https://api.github.com/users/${userName}/followers`),
        axios.get(`https://api.github.com/users/${userName}/following`),
        axios.get(`https://api.github.com/users/${userName}/starred`),
        axios.get(`https://api.github.com/users/${userName}/repos`)
      ]);

      setUserInfos(user.data);
      setUserFollowers(followers.data);
      setUserFollowing(following.data);
      setUserStars(stars.data);
      setUserRepositories(repositories.data);
    }

    fetchApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return(
    <div className="main-container">
      <div className="left-container">
        <img src={`${userInfos.avatar_url}`} alt="user profile" />

        <div className="user-name-box">
          <h5>{userInfos.name}</h5>
          <h6>{userInfos.login}</h6>
        </div>

        <button className="follow-btn" type="button">Follow</button>

        <p className="bio-info">{userInfos.bio}</p>
        
        <div className="follows">
          <p>👥{userFollowers.length} followers</p>
          <p> · {userFollowing.length} following</p>
          <p> · ⭐ {userStars.length}</p>
        </div>

        <div className="user-infos">
          <p>&#127758; {userInfos.location}</p>
          {
            userInfos.email ? <p>✉ {userInfos.email}</p> : null
          }
          {
            userInfos.blog ? <p>🔗 {userInfos.blog}</p> : null
          }
        </div>
      </div>

      <div className="right-container">
        <nav>
          <div className='repo-nav'>
            📚 Repositories 
            <span className="repo-length">{userRepositories.length}</span>
          </div>
        </nav>
        <hr className="nav-hr"/>

        {
          userRepositories.map((repo, index) => (
            <div className="repo-divs" key={index}>
              <h3>{repo.name}</h3>
              <p style={{fontSize: "14px"}}>{repo.description}</p>

              <div className="repo-infos">
                {
                  repo.language ? 
                    <span className="stack-div" style={{marginRight: "20px"}}>
                      <div className="repo-language-color" style={{backgroundColor: stacksColors[repo.language]}}></div>
                      <span>{repo.language}</span>
                    </span> 
                    :
                    null
                }
                {
                  repo.forks_count > 0 ?
                    <div style={{marginRight: "20px"}}>
                      <img src={gitforkedSvg} style={{width: "25px", height: "25px"}} alt="forked" />
                      <span>{repo.forks_count}</span>
                    </div>
                    :
                    null
                }
                {
                  repo.license ?
                    <div style={{marginRight: "20px"}}>
                      <img src={scaleSvg} style={{width: "25px", height: "25px"}} alt="scale" />
                      <span> {repo.license.name}</span>
                    </div>
                    :
                    null
                }
                <div style={{marginRight: "20px"}}>
                  {`Updated on ${convertTime(repo.updated_at)}`}
                </div>
              </div>

              <hr />
            </div>
          ))
        }

      </div>

    </div>
  );
}
export default UserPage;