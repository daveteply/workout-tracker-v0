# Workout Tracker POC Application

This is an application platform POC to track various types of exercise and fitness related activities.

## Building and running this POC

1. Install dependencies: `npm i` from the root folder
2. Update the prisma schema files: `cd apps\api\prisma` (currently uses locally running MySQL instance)
   1. `npx prisma generate`
3. Run the repo:
   1. `cd /` (back to root of project)
   2. `npm run dev`

## What's inside?

- [Turborepo](https://turbo.build/) monorepo
- [Next.js](https://nextjs.org/) UI
- [Nest.js](https://nestjs.com/) microservice API
- [Prisma](https://www.prisma.io/) OBM [:information_source:](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping)
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
