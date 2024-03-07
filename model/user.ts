import { db } from "@/lib/db";
import { Cipher, Decipher, createHash, getHashes } from "crypto";

export function getUsers(skip = 0, qty = 10) {
  try {
    return db.user.findMany({
      skip: skip,
      take: qty,
      //   include: {
      //     team: include
      //         },
    });
  } catch (e) {
    console.error("Error loading projects:", e);
  } finally {
    db.$disconnect();
  }
}

function getUserDetails({ user }: { user: string }) {
  try {
    return db.user.findUniqueOrThrow({
      where: {
        username: user,
      },
    });
  } catch (e) {}
}

// function encryptDetails(algorithm, data) {
//   var hash = createHash(algorithm, );
// }

export function getUserEnc() {
  //   let algo = localStorage.getItem("userAlgo") || "";
  //   if (!getHashes().includes(algo)) {
  //     algo = getHashes()[0];
  //   }
  const infoEnc = localStorage.getItem("userInfo") || "";
  let userid = -1;
  let username = "";
  if (infoEnc != "") {
    Decipher;
  }

  return false;
}
