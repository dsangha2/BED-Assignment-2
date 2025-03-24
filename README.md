# Employee & Branch Management API

## Project Overview

Welcome to the **Employee & Branch Management API**! This API allows you to create and manage branches, employees, and related information. It provides endpoints for creating, reading, updating, and deleting both branches and employees, making it a flexible solution for internal HR systems, store networks, or any scenario that requires a hierarchical employee-branch relationship.

### Key Features
- **Branch Management**: Create, update, and delete branch records, as well as retrieve all branches or a specific branch by ID.
- **Employee Management**: Manage employee records, including assigning employees to branches or departments.
- **Secure Endpoints**: (Optional) If you have JWT-based authentication, the routes are protected with bearer tokens.
- **Clear Documentation**: Fully documented with OpenAPI/Swagger for easy integration by developers.


## Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/dsangha2/BED-Assignment-2.git
cd BED-Assignment-2
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

1. Create a `.env` file in the project root.
2. Add the following variables:
   ```
   NODE_ENV=development
  PORT=3000
  FIREBASE_PROJECT_ID="assignment-03-8e32c"
  FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCVV9HJiTODwRrt\nlX7rmEaQvt0NF/UPq0mBEMa5se9XkAY98RP4lgB83th/Cj4eqmZXpo6Roeyt8zIT\nnbqsq+HJ6jicottwxTsl7COjVclkv/LCW83w9Ja0ImDkwM+FmWDrwe2ZqDmMw8h9\nXeY6oO2dL/0pIikUb6HEz/JqZjCpbGf3TMCIiPJK1+eodn1zruD10NIgYtqdp92B\nVWdhlNGPfFGRd1QU7EKNrNZoxNjbsbwDeefPCKAapWj5Ji4CKBcwwLm97i5ejh3+\nTT/OUvo5GriESopvZLUKDJJ1bxdsBMCBBKIzOvjm3vGKph87b0mFkdcuHe9AM0h1\nzHudaMG9AgMBAAECggEAAd2tMoJDLALA0ODHdgRwNppujZ1+g4RwMIDNUtWieBVw\na9wJaVeKcwT1GdqUEx2tlgEakpQ+LkrgayFTNe7B1/F+upTy/pzgPnri/m/xymSh\nkQRvoB1A4shJLffWFUUTfRlDsYyfXMm3cBA5HQNqD0bhuAlZZQwjWR+rV4v7pf+U\nBHIwJi9siuR/r1qDb/TsQbLpMSfzBbdX/ZnpSkvliM5CBrSjYoUWA/XEB5kEkI+4\ncR4XQ1jbOQtIwB4nqUE9oEGJpEbgRZ5kEkiRxByxic7Q/L3xvMg3omDQm0FMN3r7\nxAOsW0Ax/I/tIJH91TVwFzgsXwO60/UVeK+EBOSGWwKBgQDP5zcEPJfVPjGEXzWs\nhS3hix++/zEBef7tinUzuYtV1zBKUY2tlTHMzmfrtPFNnVJTUr3wL68BYZYdsAyt\nNhj/snfHvll7+DHA/at0ZGc0qnQ3Py75INlcnYS2RJxaqUhp5iDVu8R1Qh+eEbVk\nU00L8C5a02C7IqkfRaLTffBWawKBgQC35HWiVcRjCK1LNPlJdrPJgBt1YcNGMuq8\nSrGnAfeB23tXdAUiaUeNwQFJHDu02iJxcVzA7gvANNzrSJuuuzUCtCoGo3NiraTW\nGI6alc6zhyPwB8yvP91IgGY0OqYx6ejQA6SvkjrHJTevcRZUTFq8Gfg40U1hO7ys\nrFY/hXtCdwKBgE6rgF8DCrUvXo9nc6j/kDf7bBza9dFIN5XtQaI8AKSP0/8bUxAv\nF3QXWq2Pf4vODxvmgGcFtCRCqAo91t4oTVdcUgTsW3IUnccYdiuJ3p/ILEfHid/N\ndVKdbF2IIt4Plo4z/ZLDBXkVd19Z9hiriMkOrovB1qWZXQOvVwjObAZXAoGAL9R2\nXFDekbuyBzuyE0+Sl7iAa9mPxvR7ZZov9vZmABqsTCTbKQYlHFO1F+UGCpYqG0OX\nEn9YAxg81d2+0IXU1e0yeSOOYX40v5MHlGGer8dYq5f7vyFnVvI+oxsWGylx6pjn\n/tqT+zRM9Y7+ddKeTwqaK30VGVNGUctJa6A2XSUCgYEAg6FluyWGTBhQtKCMIlaE\nv1Y/QvdR8hDLgGMi904Y/odiKkWrqArLN3McIYyyMEhgi3sRxkAZ0ZDaEVXTZhDP\nftlTZNXClULsZjDT4bz2tVYN737FdWvrYTtYDgKsKdiaDLOZloqi7BoJD/ntBXEJ\nnyOJAn+eWI2HqG97P9syZE0=\n-----END PRIVATE KEY-----\n"
  FIREBASE_CLIENT_EMAIL="firebase-adminsdk-fbsvc@assignment-03-8e32c.iam.gserviceaccount.com"
  SWAGGER_SERVER_URL=http://localhost:3000/api/v1

   ```
3. **Do not** commit the `.env` file to version control. Confirm that `.gitignore` includes `.env`.

### 4. Start the Application

```bash
npm run dev
```

By default, the server runs at [http://localhost:3000].

---

## Example Usage

Below is a **TypeScript** example demonstrating how to make a request to the API, including a bearer token if needed. Adjust the URL or headers as required.

```
// exampleClient.ts

interface Employee {
  firstName: string;
  lastName: string;
  department?: string;
  branchId?: number;
}

/**
 * Creates a new employee by sending a POST request to your API.
 */
async function createEmployee() {
  try {
    const newEmployee: Employee = {
      firstName: "Alice",
      lastName: "Smith",
      department: "HR",
      branchId: 1,
    };

    const response = await fetch("http://localhost:3000/api/v1/employees", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(newEmployee),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    console.log("Employee created successfully:", data);
  } catch (error) {
    console.error("Error creating employee:", error);
  }
}

// Run the function
createEmployee();
```

Expected Response

```
{
  "message": "Employee Created",
  "data": {
    "id": "123",
    "firstName": "Alice",
    "lastName": "Smith",
    "department": "HR",
    "branchId": 1
  }
}
```

---

## Link to Public Documentation

We host the OpenAPI/Swagger documentation publicly via GitHub Pages (or any static hosting). You can view it here:

**[Public API Documentation](https://dsangha2.github.io/api-docs/)**

---

## Accessing OpenAPI Locally

When the application is running (e.g., `npm run dev`), you can view the Swagger UI at:

```
http://localhost:3000/api-docs
```

From here, you can explore all endpoints, see request/response formats, and test out calls.

---

## Example Requests and Responses

### 1. Get All Branches

**Request** (GET):
```
GET /api/v1/branches
```

**Response** (200 OK):
```json
{
  "message": "Branches Retrieved",
  "data": [
    {
      "id": "1",
      "name": "Headquarters",
      "location": "Downtown"
    },
    {
      "id": "2",
      "name": "Satellite Office",
      "location": "Uptown"
    }
  ]
}
```

### 2. Get All Employees

**Request** (GET):
```
GET /api/v1/employees
```

**Response** (200 OK):
```json
{
  "message": "Employees Retrieved",
  "data": [
    {
      "id": "abc123",
      "firstName": "John",
      "lastName": "Doe",
      "department": "Engineering",
      "branchId": 1
    },
    {
      "id": "xyz456",
      "firstName": "Jane",
      "lastName": "Smith",
      "department": "Marketing",
      "branchId": 2
    }
  ]
}
```

### 3. Error Response Example

If you send invalid data or request a non-existent resource, you might receive:

```json
{
  "status": "error",
  "message": "Employee not found",
  "code": "EMPLOYEE_NOT_FOUND"
}
```

---

## Secure Setup Instructions

1. **Environment Variables**:  
   Place your credentials (like Firebase keys, DB URLs, or JWT secrets) in the `.env` file.  
   For example:
   ```ini
   FIREBASE_PROJECT_ID=...
   FIREBASE_PRIVATE_KEY="..."
   FIREBASE_CLIENT_EMAIL=...
   ```
2. **.env Example**:  
   Provide a `.env.example` with placeholders:
   ```ini
   NODE_ENV=development
   PORT=3000
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----\n"
   FIREBASE_CLIENT_EMAIL=your-firebase-client-email@example.com
   SWAGGER_SERVER_URL=http://localhost:3000/api/v1
   ```
3. **API Keys**:  
   If your application uses additional API keys (e.g., third-party services), also put them in `.env`.
4. **Security Packages**:  
   - **Helmet** for secure HTTP headers  
   - **CORS** to allow only trusted origins  
   - **dotenv** to load environment variables securely

---

## Contributing

If you’d like to contribute to this project:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/newFeature`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature/newFeature`).
5. Create a Pull Request.
