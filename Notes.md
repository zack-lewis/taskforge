## Stuff I've Added

- Prisma: Used for DB access. Can be switched between different DB providers but I've settled on SQLITE for portability since this project is designed to be run as a singular instance for a single company, not for widespread use. [Prisma SQLITE](https://www.prisma.io/docs/orm/overview/databases/sqlite)
- ShadCN: Components to import instead of creating from scratch or using a library. Can be easily customized but not something I have to figure out how to build. [ShadCN Components](https://ui.shadcn.com/docs/components/)
- NextAuth: Library used for authentication via providers [NextAuth](https://next-auth.js.org/)

## Development Process

During the devlopment of this project, I found that I have a lot to learn. I started off with creating the project and trying to go head first into it. After a bit, I stopped and tried to think logically about what I need to do and in what order. I drew up some basic layouts of how I want the pages to look and function, with notes on special areas. I wanted to be able to look at the papers as if they were a functioning application. This helped a lot. I also stopped to think about what types of objects I would be storing in the database and what properties of each that I would need to store. I also considered how they would interact with each other, depend on other objects, and took the time to ensure that none of the information would be repeated. This was tricky. After I had that ironed out, I started to research database providers. I wanted to see how the "industry" connected to databases. I have done applications where the database connection was direct instead of using any sort of library but I knew there were libraries for most languages that took a lot of the complications out of it. I found Prisma. While Prisma is a decent library, it does not take enough of the database specific stuff out, so in order to set up the database, I had to figure out some of the nuances with each database type. I settled on SQLite, since it does not require any external hosting and could be portable. In combination with this app being designed for an individual company or business unit, not public consumption, this made sense so that it could be deployed easily via a single docker container. While learning about Angular Materials, I wondered if there was a similar library for NextJS. I found ShadCN, which took components from another library and made them much simpler to use. I decided not to add authentication in just yet since it would complicate things. At one point, I had started the project and actually deleted the entire code base to start a fresh project based on what I had learned. I started by creating a homepage Dashboard but quickly realized it was going to be blank until I had something to display. I then started to create the projects, teams, users, and tasks. These were all somewhat interdependent, so I tried to do as much as I could on one before moving on to another. Once I got to a certain point, I realized that I needed user authentication so that I could pull the users info to add into information I was putting into the database, so I added NextAuth. The beauty of this library is that it uses a simple middleware to call it, meaning I would not have to go to every page and add in a bunch of authentication logic. NextAuth also automatically generates the login page automatically, based on what is configured. With the simple middleware that runs any time the site is touched, it forces authentication for the entire site. Since this is a web app with no public facing area, this is perfect for my use case. I did spend a lot of time getting it to run just right as the documentation is mainly for the old Pages router from NextJS and it has some peculiarities that have to be addressed for the newer App router. I did find a way to use the authentication system to log in, but then I would look up the user's email address to find their user id and store that in a User Context so it is accessible throughout the site. I would like to implement a system that does better user matching, for instance, confirming that the user is matched to the proper profile in a way other than Github. I feel like I should be able to get some form of a Github ID to store in the database, but this was not the way that I went initially.

## Beta Note

This app is far from finished. After spending many, many hours on this app, I know that I need to spend at least another month developing it if it were going to be a viable product. A lot of functionality is not there and not complete. The code base needs to be rewritten and scrutinized to make sure it is logical and efficient. The layout and color scheme could use a lot of touch ups.

## Evaluation Criteria

### Originality: How well does the project differentiate from the tutorial examples?

This project takes the tutorial examples as just that: an example on how to do the basics. After that, there was a lot of research and learning on my own to figure out how to do what I wanted the project to do

### Complexity: Does the project demonstrate a deep understanding of the chosen technology?

I believe this project shows that I have a much deeper understanding of NextJS than I began with. I know that I have a lot to learn and a lot of refactoring to do in the future

### Functionality: How well does the project function? Are there any bugs or issues?

This project is semi-functional. A user can log in and see everything, create new users/tasks/projects. There are still bugs and a lot of missing functionality.

### Design: Is the project well-designed and user-friendly?

This is debatable. I feel I am moving in the right direction but I am not quite there yet

### Documentation: How effectively do you document. Your development process, challenges, and learnings?

Please see above :)
