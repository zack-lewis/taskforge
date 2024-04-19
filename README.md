## Getting Started

### Download the project with git:

    `git pull https://github.com/zack-lewis/taskforge.git`

### Create .env file with environment:

    ```
    NEXTAUTH_URL = <address of server>

    NEXTAUTH_SECRET = <openssl rand -base64 32>

    GOOGLE_CLIENT_ID = <from Google Cloud console>
    GOOGLE_SECRET = <from Google Cloud console>

    GITHUB_ID = <from Github app dev settings>
    GITHUB_SECRET = <from Github app dev settings>
    ```

### Create Database:

    `npx prisma migrate dev`

### Run the development server:

    `npm run dev`
