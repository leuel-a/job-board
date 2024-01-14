# Job Board

A comprehensive job board application built using Next.js and a suite of modern web development technologies, designed for efficient job postings and applications management.

## Technologies Used

- **Frontend**: React.js, Next.js for server-side rendering and static generation.
- **Form Handling**: React-Hook-Form for managing form state, Zod for validation.
- **Styling**: Tailwind CSS for utility-first styling.
- **Database**: Vercel Postgres for structured data storage.
- **File Storage**: Vercel Blob for storing files like company logos.
- **Data Fetching and Management**: Prisma as the ORM, handling database interactions.
- **Authentication**: Clerk for secure user authentication.
- **Other Utilities**: clsx for className concatenation, date-fns for date operations.

## Packages

Key npm packages include:

- `next` (v14.0.4): The React framework for production.
- `react` (v18), `react-dom` (v18): For building the user interface.
- `react-hook-form` (v7.49.3): Efficient and flexible forms management.
- `zod` (v3.22.4): TypeScript-first schema validation with static type inference.
- `@prisma/client` (v5.8.0), `prisma` (v5.8.0): Next-generation ORM for Node.js and TypeScript.
- `tailwindcss` (v3.3.0), `autoprefixer` (v10.0.1), `postcss` (v8): For modern CSS styling.
- `typescript` (v5): For type-safe code.
- `eslint` (v8), `eslint-config-next` (v14.0.4): For code quality and consistency.

## Scripts

- `dev`: Runs the application in development mode.
- `build`: Builds the application for production.
- `start`: Starts a Next.js production server.
- `lint`: Runs ESLint for code quality checks.
- `seed`: Custom script to seed the database.
- `postinstall`: Runs Prisma generate after installing packages.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure Vercel Postgres and Blob for the database and file storage.
4. Run the development server with `npm run dev`.

## Contributing

Contributions are welcome! Please read our contributing guidelines for how to contribute to this project.

## License

[Specify the type of license here]

---

This README provides an overview of the project. It includes a brief description, the technologies used, and basic instructions to get started. Expand each section as needed, providing more detailed descriptions, usage examples, and any other relevant information.
