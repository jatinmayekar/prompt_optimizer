# Prompt Optimizer

This project is a simple yet powerful web application built with Next.js for experimenting with and optimizing AI prompts. It serves as a learning tool for anyone interested in generative AI, providing a hands-on interface to explore how different models and parameters affect AI-generated responses.

## Project Overview

The main goal of this application is to offer a user-friendly playground for prompt engineering. Users can:

-   Select from various AI models.
-   Adjust parameters like temperature and max length.
-   Input a prompt and view the generated output.
-   Manage and share presets for different configurations.
-   View the underlying code for API calls.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [Shadcn/UI](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
-   **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## Project Structure

The project follows a standard Next.js App Router structure:

```
.
├── public/               # Static assets (images, fonts, etc.)
├── src/
│   ├── app/              # Main application source code
│   │   ├── components/   # Reusable React components
│   │   ├── data/         # Static data (e.g., model lists)
│   │   └── page.tsx      # The main page component
│   ├── lib/              # Utility functions
│   └── registry/         # Components for the UI registry
├── .eslintrc.json        # ESLint configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Documentation

Project changes and version history are documented in the `CHANGELOG.md` file. This `README.md` file serves as the primary source of information for understanding the project's purpose, structure, and setup.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1.  Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```sh
    cd prompt_optimizer
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```

### Running the Application

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
