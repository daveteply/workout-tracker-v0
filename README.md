# Workout Tracker POC Application

This is an application platform POC to track various types of exercise and fitness related activities.

## Setup dependencies and running this POC

### [MySQL](https://www.mysql.com/)

1.  Using locally installed MySQL instance (8.4.2 MySQL Community Server)
    1. Utilize [Prisma](https://www.prisma.io/) to push the relational schema to local running instance
       1. `cd apps/api-structure/prisma`
       2. `npx prism db push` will create the schema from the `schema.prisma` schema definition
    1. Update the generated classes:
       1. `cd apps/api-structure/prisma`
       2. `npx prisma generate`
    1. (Optional) Seed the database with some baseline data
       1. `cd apps/api-structure/prisma`
       2. `npm run seed`

### [MongoDB](https://www.mongodb.com/)

1.  Local instance of MongoDB

### .env

1.  Create/update `.env` files
    | Project folder | Reference env file |
    | -------------------- | ----------------------------------- |
    | `apps/api-structure` | `docs/api-structure-env-backup.txt` |
    | `apps/api-tracking` | `docs/api-tracking-env-backup.txt`|
    | `apps/web` | `docs/web-env-backup.txt` |

### [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

1.  To simplify networking for those running Windows 11 22H2:
    1. Enable [Mirror mode networking](https://learn.microsoft.com/en-us/windows/wsl/wsl-config#configuration-settings-for-wslconfig)
    2. See notes in `docs/wslconfig-backup.txt`

### Launch 🚀

1. Install `npm` dependencies: `npm i` from the root folder
2. Launch the local dev environment:
   1. `cd /` (to root of project)
   2. `npm run dev`

## What's inside?

- [Turborepo](https://turbo.build/) monorepo
- [Next.js](https://nextjs.org/) UI
- [Nest.js](https://nestjs.com/) microservice API
- [Prisma](https://www.prisma.io/) ORM [:information_source:](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping)
- [Tailwind CSS](https://tailwindcss.com/)

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
