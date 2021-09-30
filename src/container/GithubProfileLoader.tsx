import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GithubProfileInfo from "../compontents/GithubProfileInfo";
import GithubUsernameForm from "../compontents/GithubUsernameForm";

import { RootState } from "../reducer";
import { getUserProfileAsync } from "../reducer/github";

function GithubProfileLoader() {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.github.userProfile
  );
  const dispatch = useDispatch();
  const onSubitUsername = (username: string) => {
    dispatch(getUserProfileAsync.request(username));
  };

  return (
    <>
      <GithubUsernameForm onSubmitUsername={onSubitUsername} />
      {loading && <p style={{ textAlign: "center" }}>로딩중..</p>}
      {error && <p style={{ textAlign: "center" }}>에러 발생!</p>}
      {data && (
        <GithubProfileInfo
          bio={data.bio}
          blog={data.blog}
          name={data.name}
          thumbnail={data.avatar_url}
        />
      )}
    </>
  );
}

export default GithubProfileLoader;
