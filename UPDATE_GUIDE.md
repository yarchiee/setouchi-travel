# How to Update Your Setouchi Travel App

Updating your website is easy. Follow these simple steps whenever you want to change the content or fix something.

## 1. Edit the Code
Open the project folder (`d:\develop\react\setouchi-travel`) in your code editor (like VS Code).
- **Edit Content**: Most of the text and itinerary data is in `src/App.jsx`.
- **Save**: Remember to save your files (`Ctrl + S`) after making changes.

## 2. Test Locally (Optional but Recommended)
If you want to see the changes on your computer before updating the real website:
1. Open a terminal in the folder.
2. Run `npm run dev`.
3. Open the `localhost` link it gives you to check your changes.

## 3. Deploy to the Live Website
When you are happy with your changes:

1.  Find the file **`deploy_to_vercel.bat`** in your project folder.
2.  **Double-click** it to run.
3.  Wait for it to finish.
4.  Once it says "Deployment Finished!", your live website is updated!

## 4. Backup Your Code (Git) - Optional
It is good practice to save your changes to Git (version control) so you don't lose them.
1. Open a terminal.
2. Run:
   ```bash
   git add .
   git commit -m "Describe your changes here"
   ```
   (Replace "Describe your changes here" with what you did, e.g., "Updated lunch price")

That's it!
