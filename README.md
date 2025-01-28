# NextJS + GraphQL Sample Project

This project is a monorepo that contains Client (NextJS) and Server (Apollo GraphQL)

<!-- GETTING STARTED -->

## Getting Started

To make sure you can install the correct packages and server the server as intended, it is recommended to follow the steps below.

### Prerequisites

- [Bun](https://bun.sh/docs/installation)
  ```sh
  npm install -g bun
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/jingkaifuel/next-graphql
   ```

2. Start Backend Development Server

   1. Install package

      ```sh
      cd server
      bun install
      ```

   2. Set up the environmental values in `.env`

      ```bash
      MONGODB_URI=mongodb://localhost:27017/sample
      ACCESS_TOKEN_SECRET=ACCESS_SECRET_KEY
      REFRESH_TOKEN_SECRET=REFRESH_SECRET_KEY
      ```

   3. Start backend server
      ```sh
      bun dev
      ```

3. Start Client Development Server

   1. Install package

      ```sh
      cd client
      bun install
      ```

   2. Set up the environmental values in `.env`

      ```bash
      NEXT_PUBLIC_BACKEND_URI=http://localhost:4000/
      ```

   3. Start development server

      ```sh
      bun dev
      ```
