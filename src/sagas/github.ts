import { getUserProfileAsync, GET_USER_PROFILE } from "../reducer/github";
import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { getUserProfile, GithubProfile } from '../api/github'
import { AxiosError } from "axios";

function* getUserProfileSaga(action: ReturnType<typeof getUserProfileAsync.request>) {
    try {
        const userProfile: GithubProfile = yield call(getUserProfile, action.payload);

        yield put(getUserProfileAsync.success(userProfile));

    } catch (e) {
        const { request } = e as AxiosError;
        yield put(getUserProfileAsync.failure(request));
    }
}

export function* githubSaga() {
    yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
}

export default function* rootSaga() {
    yield all([
        fork(githubSaga)
    ])
}