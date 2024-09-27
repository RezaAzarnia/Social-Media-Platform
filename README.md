# Social Media Platform

A fully-featured social media platform built with **Next.js**, **Prisma**, **SWR**, and **AWS**. This project implements modern web technologies and provides an optimized user experience through features like authentication, post interactions, profile management, image uploads, and more.

### [Live Demo: Social Media Platform](https://snapgram.liara.run/)

Developed by Reza Azarnia – Rezaazarnia158@gmail.com

## Features

- **Authentication**: Login and registration with **NextAuth**.
- **Post Interactions**:
  - Show newest posts.
  - Like & Dislike posts.
  - Save & Unsave posts.
  - Delete posts.
- **User Profiles**:
  - Display user profiles.
  - Logged-in users can view their liked and created posts (tab-based view).
  - Other users cannot see liked posts of other users.
  - Edit profile functionality.
- **Content Discovery**:
  - Show top creators.
  - Explore section for trending posts.
  - Show more related posts on single post pages.
- **Performance Enhancements**:
  - Infinite scroll for posts.
  - Debounce functions to optimize searches and post filtering.
  - Cache management using **SWR**.
- **Media Handling**:
  - Image uploads with drag and drop functionality using **AWS S3**.
- **Error Handling**:
  - Not Found pages with custom error messages.
  - Sidebar is hidden on Not Found pages using context.
- **Database**:
  - Handled with **Prisma** and **SQLite** (or other supported databases).
- **Responsive Design**: Fully optimized for mobile and desktop experiences.
  
## Tech Stack

- **Next.js**: Full-stack framework for React.
- **Prisma**: ORM for database management.
- **SWR**: For cache management and data fetching.
- **NextAuth**: Authentication library for Next.js.
- **AWS S3**: Cloud storage for image uploads.
- **TypeScript**: Strongly typed JavaScript.
- **CSS Modules**: For scoped styling.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/RezaAzarnia/Social-Media-Platform.git
  ```
2.Navigate to the project directory:
```bash
   cd Social-Media-Platform.git
 ```
3.Install dependencies:
```bash
   npm install
```
4.Set up environment variables by creating a .env.local file in the root directory:
```bash
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
NEXT_PUBLIC_RECAPTCH_SITE_KEY=<your-recaptcha-site-key>
RECAPTCHA_SECRET_KEY=<your-recaptcha-secret-key>
AUTH_SECRET=<your-auth-secret>
AUTH_URL=http://localhost:3000
SECRET_KEY=<your-secret-key>
REFRESH_SECRET_KEY=<your-refresh-secret-key>
API_URL=http://localhost:3000
PICTURE_URL=<your-picture-url>
NEXT_PUBLIC_PICTURE_URL=<your-picture-url>
LIARA_ENDPOINT=<your-liara-endpoint>
LIARA_BUCKET_NAME=<your-liara-bucket-name>
LIARA_ACCESS_KEY=<your-liara-access-key>
LIARA_SECRET_KEY=<your-liara-secret-key>
```
5.Run the development server:
```bash
npm run dev
```



