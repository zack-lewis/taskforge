import { sha256 } from "./until";


export function getImgUrl(email) {
    const fixedemail = email.trim().toLowerCase()
    const hash = sha256(fixedemail);
    // console.log(fixedemail,": ",hash)
    const url = "https://www.gravatar.com/avatar/"+ hash+"?s=200";
    return url
}