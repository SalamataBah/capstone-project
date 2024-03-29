import React from "react";
import "./Match.css";
import Loading from "../Loading/Loading";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Match({
  isLoading,
  setIsLoading,
  matches,
  getMatches,
  matchLimit,
  offset,
  setOffset,
  createMatch,
  goToMatch,
}) {
  return isLoading || !matches || !Array.isArray(matches) ? (
    <Loading></Loading>
  ) : matches.length == 0 ? (
    <Loading />
  ) : (
    <div className="match" id="match">
      {matches.map((match, index) => (
        <div key={index} className="card">
          <p className="basic-info">Match Name: </p>
          <p className="card-text">{match.userInfo.username}</p>
          <p className="basic-info">Industry:</p>
          <p className="card-text">{match.userInfo.location}</p>
          <p className="basic-info">Bio:</p>
          <p className="card-text">{match.userInfo.bio}</p>
          <p className="basic-info">Major:</p>
          <p className="card-text">{match.userInfo.major}</p>
          <p className="basic-info">Skills: {match.userInfo.skills}</p>
          {Array.isArray(match.interestsInfo.skills) &&
          match.interestsInfo.skills.length > 0 ? (
            <div>
              {match.interestsInfo.skills.map((skill, key) => (
                <p key={key} className="card-text">
                  {skill.name} {""}
                </p>
              ))}
            </div>
          ) : null}{" "}
          <p className="basic-info">Companies: {match.userInfo.companies}</p>
          {Array.isArray(match.interestsInfo?.companies) &&
          match.interestsInfo.companies?.length > 0 ? (
            <div>
              {match.interestsInfo.companies?.map((company, key) => (
                <p key={key} className="card-text">
                  {company.name} {""}
                </p>
              ))}
            </div>
          ) : null}{" "}
          <p className="basic-info">Languages: {match.userInfo.languages}</p>
          {Array.isArray(match.interestsInfo?.languages) &&
          match.interestsInfo.languages?.length > 0 ? (
            <div>
              {match.interestsInfo.languages?.map((language, key) => (
                <p key={key} className="card-text">
                  {language.name} {""}
                </p>
              ))}
            </div>
          ) : null}{" "}
          {match.scoreInfo.display_private ? (
            <div>
              <p>{`${match.userInfo.username} gave you a heart!`}</p>
            </div>
          ) : null}
          {
            <button
              className="button"
              onClick={async () => {
                setIsLoading(true);
                const liked = match.scoreInfo.liked;
                await createMatch({
                  matchId: match.userInfo.objectId,
                  liked: !liked,
                });
                await getMatches(10, 0);
                await goToMatch();
                setIsLoading(false);
              }}
            >
              {" "}
              {match.scoreInfo.liked ? <FaHeart /> : <FaRegHeart />}
            </button>
          }
        </div>
      ))}
      {matches.length < matchLimit ? null : (
        <p
          className="button"
          onClick={() => {
            const newOffset = Number(offset) + Number(matchLimit);
            getMatches(matchLimit, newOffset);
            setOffset(newOffset);
          }}
        >
          {" "}
          Other Matches{" "}
        </p>
      )}
    </div>
  );
}
