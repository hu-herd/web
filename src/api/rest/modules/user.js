import fetch from 'cross-fetch';

export async function fetchUserDetails (jwt, userId) {
  let res = await fetch('http://localhost:8080/api/users/' + userId, {
    credentials: 'include',
    headers: {
      'Authorization': jwt
    }
  });
  let json = await res.json();
  if (!res.ok) {
    let err = new Error();
    err.name = res.status + ' - ' + res.statusText;
    err.message = json.error.name + (json.error.message ? ': ' + json.error.message : '');
    throw err;
  }
  return json;
}

export async function requestCreateUser (jwt, firstName, lastName, email, hNumber, password, register) {
  let res = await fetch('http://localhost:8080/api/users', {
    method: 'POST',
    headers: {
      'Authorization': jwt,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      hNumber,
      password,
      register
    })
  });
  let json = await res.json();
  if (!res.ok) {
    let err = new Error();
    err.name = res.status + ' - ' + res.statusText;
    err.message = json.error.name + (json.error.message ? ': ' + json.error.message : '');
    throw err;
  }
  return json;
}
