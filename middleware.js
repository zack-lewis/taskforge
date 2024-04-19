import { withAuth } from "next-auth/middleware";
import { newUser } from "./app/_actions/users";

export const config = { matcher: ["/"] };

export default withAuth({});
