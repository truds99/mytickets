# Ticket Management System - Backend Tests

This project contains backend tests implemented in TypeScript for an event and ticket management system. The goal was to apply testing to an existing application using tools like Jest, Faker, and Supertest to ensure the functionality of event and ticket management.

- **Ticket and Event Management**: Test cases for creating, reading, updating, and deleting tickets and events.
- **Error Handling**: Validates proper error handling, including scenarios where events or tickets are not found.
- **Integration Tests**: Ensures proper interaction between various components, including routes and services.
- **Supertest**: Used to simulate API requests and verify correct responses.
- **Jest**: Framework used for writing and executing test cases.
- **Faker**: Utilized for generating fake data during the tests to ensure realism and randomness.

## Technologies
The following tools and frameworks were used in the construction of the project:<br>
<p>
    
<p> 
    <img style='margin: 5px;' src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="40" alt="Node.js logo" /> 
    <img style='margin: 5px;' src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" height="40" alt="TypeScript logo" /> 
    <img style='margin: 5px;' src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" height="40" alt="Jest logo" /> 
    <img style='margin: 5px;' src="https://img.shields.io/badge/Faker.js-83B81A?style=for-the-badge&logo=faker&logoColor=white" height="40" alt="Faker.js logo" /> 
    <img style='margin: 5px;' src="https://img.shields.io/badge/Supertest-000000?style=for-the-badge&logo=supertest&logoColor=white" height="40" alt="Supertest logo" /> 
</p>

## Getting Started

Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A relational database (such as PostgreSQL, MySQL, etc.)

### 1. Clone the Repository

```bash
git clone https://github.com/truds99/mytickets.git
cd mytickets
```

### 2. Install Project Dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a .env and a .env.test file in the root directory and add your MongoDB URI, server port, and JWT secret.

```bash
DATABASE_URL=your_database_url
PORT=your_port_number
```

### 4. Run the tests

```bash
npm run test
```
