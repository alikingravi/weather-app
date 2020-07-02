export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.api_token) {
    return { Authorization: `Bearer ${user.api_token}` };
  } else {
    return {};
  }
}
