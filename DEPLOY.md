# Deploying to Vercel

Since I cannot run the deployment command directly due to permission issues in this environment, please follow these steps to deploy your application.

## Prerequisites

1.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com/signup).
2.  **Node.js**: Ensure Node.js is installed.

## Option 1: Deploy from Terminal (Recommended)

1.  Open your terminal in the project folder:
    `d:\develop\react\setouchi-travel`

2.  Run the deployment command:
    ```bash
    npx vercel
    ```

3.  Follow the interactive prompts:
    - **Set up and deploy?**: `Y`
    - **Which scope?**: Select your account.
    - **Link to existing project?**: `N` (unless you already created one for this).
    - **Project name**: `setouchi-travel` (or your preference).
    - **In which directory?**: `.` (default).
    - **Want to modify these settings?**: `N` (default).

4.  Wait for the deployment to finish. You will get a `Production: https://...` URL.

## Option 2: Deploy via GitHub

1.  Push your code to a GitHub repository.
2.  Go to the [Vercel Dashboard](https://vercel.com/dashboard).
3.  Click **Add New...** -> **Project**.
4.  Import your GitHub repository.
5.  Vercel will detect `Vite` automatically.
6.  Click **Deploy**.

## Verification

After deployment, check the URL provided by Vercel. The application should load correctly with the updated title "四國九日遊".
