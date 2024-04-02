import { sha256 } from "./utils";

export function makeGravUrl(email) {
  const fixedEmail = email.trim().toLowerCase();
  const hash = sha256(fixedEmail);
  const url = "https://www.gravatar.com/avatar/" + hash + "?s=200";
  return url;
}
