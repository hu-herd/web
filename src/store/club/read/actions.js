import * as api from '../../../api/rest';

export const FETCH_CLUB_LIST_BEGIN = 'FETCH_CLUB_LIST_BEGIN';
export const FETCH_CLUB_LIST_SUCCESS = 'FETCH_CLUB_LIST_SUCCESS';
export const FETCH_CLUB_LIST_ERROR = 'FETCH_CLUB_LIST_ERROR';
export const INVALIDATE_CLUB_LIST = 'INVALIDATE_CLUB_LIST';

export const FETCH_CLUB_DETAILS_BEGIN = 'FETCH_CLUB_DETAILS_BEGIN';
export const FETCH_CLUB_DETAILS_SUCCESS = 'FETCH_CLUB_DETAILS_SUCCESS';
export const FETCH_CLUB_DETAILS_ERROR = 'FETCH_CLUB_DETAILS_ERROR';
export const INVALIDATE_CLUB_DETAILS = 'INVALIDATE_CLUB_DETAILS';

export function fetchClubDetails (clubId) {
  return function (dispatch, getState) {
    let jwt = getState().authentication.jwt.jwt;
    (async function () {
      dispatch(fetchClubDetailsBegin(clubId));
      try {
        let club = await api.club.getClub(jwt, clubId);
        dispatch(fetchClubDetailsSuccess(clubId, club));
      } catch (err) {
        dispatch(fetchClubDetailsError(clubId, err));
      }
    })();
  };
}

export function fetchClubDetailsBegin (clubId) {
  return {
    type: FETCH_CLUB_DETAILS_BEGIN,
    clubId: clubId
  };
}

export function fetchClubDetailsSuccess (clubId, json) {
  return {
    type: FETCH_CLUB_DETAILS_SUCCESS,
    clubId: clubId,
    club: json,
    receivedAt: Date.now()
  };
}

export function fetchClubDetailsError (clubId, json) {
  return {
    type: FETCH_CLUB_DETAILS_ERROR,
    clubId: clubId,
    error: json
  };
}

export function fetchClubList () {
  return function (dispatch, getState) {
    let jwt = getState().authentication.jwt.jwt;
    (async function () {
      dispatch(fetchClubListBegin());
      try {
        let clubs = await api.club.getClubs(jwt);
        dispatch(fetchClubListSuccess(clubs));
      } catch (err) {
        dispatch(fetchClubListError(err));
      }
    })();
  };
}

export function fetchClubListBegin () {
  return {
    type: FETCH_CLUB_LIST_BEGIN
  };
}

export function fetchClubListSuccess (json) {
  let clubs = {};
  for (let club of json) {
    clubs[club._id] = club;
  }
  return {
    type: FETCH_CLUB_LIST_SUCCESS,
    clubs: clubs,
    receivedAt: Date.now()
  };
}

export function fetchClubListError (json) {
  return {
    type: FETCH_CLUB_LIST_ERROR,
    error: json
  };
}
