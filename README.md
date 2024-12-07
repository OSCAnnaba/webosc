<div align="center">
  <a href="mailto:osca@univ-annaba.dz"><img src="https://github.com/user-attachments/assets/086d9a88-1a13-4c61-b57a-c11c60aa53fd" width="100"/></a>
</div>

## Introduction

This project is a web application that allows organizations to create announcements, events, and more, while enabling others to view and engage with them

<div align="center">
  <kbd>
    <img src="https://github.com/user-attachments/assets/e903314e-1692-4452-b4f6-96598837aa4c" />
  </kbd>
</div>

## Prerequisites

Before you begin, ensure you have the following installed:

- **PostgreSQL**
- **Node.js**

## Cloning the Repository

To get started, clone the repository by running the following command in your terminal:

```
git clone https://github.com/OSCAnnaba/webosc
```

## Installing Dependencies

Follow these steps to set up the project:

1. Install the required Node.js dependencies by running:
```
npm install
```

2. Create a `.env` file in the root directory of the project. Copy the contents of `.env.template` into the `.env` file, and replace `<username>` and `<password>` with your PostgreSQL username and password
  
3. Push the Prisma schema to your PostgreSQL database:
```
npx prisma db push
```

4. Generate the Prisma client
```
npx prisma generate
```

5. Start the development server:
```
npm run dev
```

## Accessing the Application

Once the development server is running, open your browser and navigate to:
[http://localhost:3000](http://localhost:3000)
