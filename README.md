# Setup

```
npm install
copy .env.example .env
npm run test
```

## Book API

This application provides a simple API for managing books and their associated categories.

### Getting Started

Before you can run this application, make sure you have [Node.js](https://nodejs.org/) and npm installed.

#### Installation

1. Clone the repository:

    ```bash
    git clone [your-repo-url]
    cd [your-repo-directory]
    copy .env.example .env
    ```

2. Install the dependencies:

    ```bash
    npm install
    npx prisma migrate dev
    ```



3. Start the server:

    ```bash
    npm start
    ```

The API should now be running on your specified port (default is 3000).

### API Endpoints

- **GET** `/book` - Retrieves all books.

- **POST** `/book` - Creates a new book.

- **DELETE** `/book/:id` - Deletes a book by ID.

- **POST** `/category` - Creates a new category.

- **GET** `/search` - Searches for books based on a query string.

### Testing

Run tests with:

```bash
npm test
```

### API Features
- Create, retrieve, and delete books.
- Assign categories to books.
- Search for books by title, author, or category.
