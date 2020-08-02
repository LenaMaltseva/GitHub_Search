import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Repos } from "../components/Repos";
import { GithubContext } from "../context/github/githubContext";

export const Profile = ({match}) => {
  const urlName = match.params.name
  const {getUser, getRepos, loading, user, repos} = useContext(GithubContext)

  useEffect(() => {
    getUser(urlName)
    getRepos(urlName)
    // eslint-disable-next-line 
  }, [])
  
  if(loading) {
    return <p className="text-center">Loading...</p>
  }

  const { 
    name, company, avatar_url, login, html_url,
    location, bio, blog, following, followers, public_repos, public_gists
  } = user

  return (
    <>
      <Link to="/" className="btn btn-link">Go back</Link>
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">

            <div className="col-sm-3 text-center">
              <img 
                src={avatar_url} 
                alt={name}
                style={{width: "150px"}}
              />
              <h1>{name}</h1>
              {location && <p>Location: {location}</p>}
            </div>

            <div className="col">
              {
                bio && 
                <>
                  <h3>BIO</h3>
                  <p>{bio}</p>
                </>
              }
              <ul>
                {login && <li><strong>Username: </strong>{login}</li>}
                {company && <li><strong>Company: </strong>{company}</li>}
                {blog && <li><strong>Website: </strong>{blog}</li>}
              </ul>
              <div className="badge badge-primary ml-4">Followers: {followers}</div>
              <div className="badge badge-success">Following: {following}</div>
              <div className="badge badge-info">Repos: {public_repos}</div>
              <div className="badge badge-dark">Gists: {public_gists}</div>
              <div className="col mt-4 ml-2">
                <a 
                  href={html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark"
                >Open profile</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Repos repos={repos}/>
    </>
  );
};
