# Tinyfolio

An app for showcasing both individual and collaborative projects with people.

> **Important:**  
> This application uses cookies for authentication, and may be blocked by your browser settings.
> To ensure this application works, change your browser settings to allow third-party cookies.

## Setup instructions

To run this application locally, you will need the correct files below:

- `appsettings.Development.json` placed in the `/api` directory
- `.env` file placed in the `/client` directory

To run the .NET webapi, change directory into the `/api` directory and execute `dotnet run`

```
cd ./api

dotnet run
```

To run the Vite React application, change directory into the `/client` directory, run `pnpm install`, and then run `pnpm dev` (make sure you have `pnpm` installed!)

```
cd ./client

// if you don't have pnpm installed
// npm install -g pnpm

pnpm install

pnpm dev
```

## Advanced requirements

- Theme switching in the application (accessible in the topbar)
- End-to-end testing using the Cypress library
- Component testing using the Cypress library
