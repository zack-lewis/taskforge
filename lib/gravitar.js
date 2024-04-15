import { sha256 } from "./utils";

export function makeGravUrl(email) {
  if (!email) {
    return "https://gravatar.com/avatar";
  }
  const fixedEmail = email.trim().toLowerCase();
  const hash = sha256(fixedEmail);
  const url = "https://www.gravatar.com/avatar/" + hash + "?s=200";
  return url;
}
