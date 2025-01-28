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

## Sidenotes

This is a proof-of-concept (POC) project designed to demonstrate how GraphQL can handle authorization using JWTs, along with a direct MongoDB database connection. While this stack is suitable for testing and small-scale applications, it may face scalability challenges as the project grows due to limitations in direct database access and the potential performance bottlenecks of handling large-scale user authentication and authorization through JWTs.

Consider this POC as a starting point, and explore alternative approaches, such as adding an API gateway, introducing database connection pooling, or implementing microservices for more robust scalability in production environments.
