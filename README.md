# odin-blog-api

A blog site managed by a single admin. [The Odin Project exercise](https://www.theodinproject.com/lessons/nodejs-blog-api) to learn NodeJS, Express, and authentication.

- Everybody can see blog posts.
- People can signup and become a member.
- Users can comment to blog posts.
- Users can update their profile info.
- Users can delete their profile and comments.
- Admin can add, edit, delete blog posts.
- Admin can delete users and comments.

# [Live Preview](https://odin-blog-api.vercel.app/blog-api/v1/)

## Setup

### Step 1: Environment File Setup

Create .env file in backend folder:

- clientUrl = "http://localhost:5173" If your client url different, make changes accordingly.

Also create .env file inside the frontend folder:

- VITE_baseUrl = "http://localhost:3000/blog-api/v1/"

After creating those environment variables continue to dependency installation.

### Step 2: Dependency Installation

Execute inside the both frontend and backend folders after cloning the repo:

```sh
npm install
```

### Step 3: Launching the Development Server

Execute:

```sh
npm start
```

Or to start the server continuously with nodemon:

```sh
npm run devstart
```

### Step 4: Launching the Client

Inside the frontend folder execute:

```sh
npm run dev
```

## Usage

If you do not want to create new user,to login as user use:

- email - test@test.com
- password - 1234

To log in as admin, use:

- email - admin@admin.com
- password - 1234
