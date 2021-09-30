import { createReducer, createAsyncAction, ActionType } from "typesafe-actions";
import { AsyncState, asyncState } from "../lib/reducerUtils";
import { AxiosError } from "axios";
import { GithubProfile } from "../api/github";

// 액션 함수 정의
export const GET_USER_PROFILE = 'github/GET_USER_PROFILE';
export const GET_USER_PROFILE_SUCCESS = 'github/GET_USER_PROFILE_SUCCESS';
export const GET_USER_PROFILE_ERROR = 'github/GET_USER_PROFILE_ERROR';

// 액션 함수 생성
export const getUserProfileAsync = createAsyncAction(
    GET_USER_PROFILE,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_ERROR
)<string, GithubProfile, AxiosError>();

// reducer에 사용될 action 반환 타입 및 state 반환 타입 정의
export type GithubAction = ActionType<typeof getUserProfileAsync>;
export type GithubState = {
    userProfile: AsyncState<GithubProfile, Error>
}

// initialState 정의
const initialState: GithubState = {
    userProfile: asyncState.inital()
    // userProfile: {
    //     loading: false,
    //     error: null,
    //     data: null,
    // }
};

// reducer
const github = createReducer<GithubState, GithubAction>(initialState, {
    [GET_USER_PROFILE]: (state) => ({
        ...state,
        userProfile: asyncState.load(),
        // userProfile: {
        //     loading: true,
        //     error: null,
        //     data: null,
        // }
    }),
    [GET_USER_PROFILE_SUCCESS]: (state, action) => ({
        ...state,
        userProfile: asyncState.success(action.payload)
        // userProfile: {
        //     loading: false,
        //     error: null,
        //     data: action.payload
        // }
    }),
    [GET_USER_PROFILE_ERROR]: (state, action) => ({
        ...state,
        userProfile: asyncState.error(action.payload)
        // userProfile: {
        //     loading: false,
        //     error: action.payload,
        //     data: null,
        // }
    }),
})

export default github;

// 지금 정리된 saga action return 타입은 하나 밖에 없어서 이런식으로 정리 될 수 있지만..
// 액션 객체의 타입 반환 자체는 여러 종류가 될 수 도 있기때문에 아래와 같은 형식으로 만드는게 더 좋다.

// https://github.com/velopert/velog-client/blob/master/src/modules/write.ts
// https://github.com/velopert/velog-client/tree/master/src/modules/core
