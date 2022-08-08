import axios from 'axios'
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
  const [errorMessage, setErrorMessage] = useState('');

  const BASE_API_URL = "https://api.github.com/users";
  
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const [user, followers, following, stars, repositories] = await Promise.all([
          axios.get(`${BASE_API_URL}/${userName}`),
          axios.get(`${BASE_API_URL}/${userName}/followers`),
          axios.get(`${BASE_API_URL}/${userName}/following`),
          axios.get(`${BASE_API_URL}/${userName}/starred`),
          axios.get(`${BASE_API_URL}/${userName}/repos`)
        ]);
        
        setUserInfos(user.data);
        setUserFollowers(followers.data);
        setUserFollowing(following.data);
        setUserStars(stars.data);
        setUserRepositories(repositories.data);
      } catch (error) {
        console.log(error);
        setErrorMessage('Erro ao buscar informações do usuário');
        return null;
      }
    }
    
    fetchApi();
  }, []);


  return(
    errorMessage.length > 0 ? <h1>{errorMessage}</h1>
    :
    <div className="main-container">

      {/* CONTAINER DA ESQUERDA */}
      <div className="left-container">
        <img src={`${userInfos.avatar_url}`} alt="user profile" />
        <div className="user-name-box">
          <h5>{`${userInfos.name}`}</h5>
          <h6>{`${userInfos.login}`}</h6>
        </div>
        <button className="follow-btn" type="button">
          {`Follow`}
        </button>
        <p className="bio-info">
          {`${userInfos.bio}`}
        </p>
        <div className="follows">
          <p>
            {`👥${userFollowers.length} followers`}
          </p>
          <p>
            {` · ${userFollowing.length} following`}
          </p>
          <p>
            {` · ⭐ ${userStars.length}`}
          </p>
        </div>
        <div className="user-infos">
          <p>{`🌎${userInfos.location}`}</p>
          {
            userInfos.email ? <p>{`✉${userInfos.email}`}</p> : null
          }
          {
            userInfos.blog ? <p>{`🔗${userInfos.blog}`}</p> : null
          }
        </div>
      </div>

      {/* CONTAINER DA DIREITA */}
      <div className="right-container">
        <nav>
          <div className='repo-nav'>
            {`📚 Repositories `}
            <span className="repo-length">{`${userRepositories.length}`}</span>
          </div>
        </nav>
        <hr className="nav-hr"/>
        {
          userRepositories.map((repo, index) => (
            <div className="repo-divs" key={index}>
              <h3>
                {`${repo.name}`}
              </h3>
              {
                repo.description ? 
                  <p style={{fontSize: "14px"}}>
                    {`${repo.description}`}
                  </p>
                  :
                  <div> </div>
              }
              <div className="repo-infos">
                {
                  repo.language ? 
                    <div className="stack-div stacks-infos">
                      <div className="repo-language-color" style={{backgroundColor: stacksColors[repo.language]}}></div>
                      <span>
                        {`${repo.language}`}
                      </span>
                    </div> 
                    :
                    null
                }
                {
                  repo.forks_count > 0 ?
                    <div className="stacks-infos">
                      <img src={gitforkedSvg} style={{width: "25px", height: "25px"}} alt="forked" />
                      <span>
                        {`${repo.forks_count}`}
                      </span>
                    </div>
                    :
                    null
                }
                {
                  repo.license ?
                    <div className="stacks-infos">
                      <img src={scaleSvg} style={{width: "25px", height: "25px"}} alt="scale" />
                      <span>
                        {`${repo.license.name}`}
                      </span>
                    </div>
                    :
                    null
                }
                <div className="stacks-infos">
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