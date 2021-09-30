import { all, fork } from "@redux-saga/core/effects";
import github from "../sagas/github";

export default function* rootSaga() {
    yield all([
        fork(github)
    ])
}