# Debugging Analysis

This document covers three debugging scenarios in our Node.js/Express/TypeScript project. Each scenario demonstrates where I paused the code, what I observed, and what I learned. Screenshots are located in the `debugging/screenshots/` folder.

## Scenario 1: Validation Logic (Joi)

- **Breakpoint Location:** `src/api/v1/middleware/validate.ts` line 18
- **Objective:** Investigate how missing fields (`name`) trigger a validation error.

### Debugger Observations
- **Variable States:** 
  - `data` was `{ position: "Manager" }` 
  - `schema` was the employee schema requiring `name`
  - `error.details` said “Name cannot be empty”
- **Call Stack:** 
  1. `validateRequest(employeeSchema)`
  2. `validate(schema, data)`
  3. `schema.validate(...)`
- **Behavior:** 
  - The code was about to throw an error for missing `name`.
  - This means we’d send a 400 response to Postman.

### Analysis
- We learned how Joi quickly flags missing fields.
- Everything worked as intended: no unexpected behavior.
- Possibly we could unify error messages or add more fields to the schema.
- This scenario confirmed our request is stopped early if it fails validation.

## Scenario 2: Firestore Operations

- **Breakpoint Location:** `src/api/v1/services/employeeService.ts` (around line 53 in `getEmployeeById`)
- **Objective:** Observe how we retrieve an employee document from Firestore and transform it into an `Employee` object.

### Debugger Observations

- **Variable States:**
  - `id` was `"abc123"`.
  - `docSnap` from `firestoreRepo.getDocumentById("employees", id)` had `docSnap.id = "abc123"` and `docSnap.data()` returned `{ name: "Alice", ... }`.

- **Call Stack:**
  1. `employeeController.getEmployeeById`
  2. `employeeService.getEmployeeById`
  3. `firestoreRepo.getDocumentById("employees", "abc123")`

- **Behavior:**
  - If Firestore finds the document, we return `{ id: docSnap.id, ...docSnap.data() }`.
  - If not found, the repository throws a `RepositoryError`.

### Analysis

- This showed exactly how Firestore data is turned into our `Employee` type.
- If the doc is missing, we get a custom error, eventually leading to a 404 in our error handler.
- No surprises—this is our intended logic.
- This scenario confirmed that doc snapshots are merged properly into a typed object.

---

## Scenario 3: Error Handling Middleware

- **Breakpoint Location:** `src/api/v1/middleware/errorHandler.ts` (around line 20)
- **Objective:** Confirm how a `RepositoryError` travels through our global error handler and sets the right HTTP status.

### Debugger Observations

- **Variable States:**
  - `err` was a `RepositoryError` with message `"Employee not found"` and `statusCode = 404`.
  - `res` had not yet been populated at the moment we paused.

- **Call Stack:**
  1. `employeeService.getEmployeeById` → doc not found
  2. `firestoreRepo.getDocumentById` → throws `RepositoryError`
  3. `errorHandler(err, req, res, next)`

- **Behavior:**
  - The handler recognized `err instanceof RepositoryError`.
  - It set `res.status(err.statusCode)` and returned a JSON error with that status.

### Analysis

- Confirmed that missing docs lead to a `RepositoryError`, which becomes a 404 response.
- Everything behaved as intended—no unexpected behavior.
- Possibly could standardize some error codes or add more logs, but overall it’s correct.
- This scenario helped me see how custom errors propagate from repository to service to controller to the error handler.


# Conclusion

By stepping through these three scenarios—Joi validation, Firestore operations, and error handling—we verified each layer of our application. I confirmed that invalid data is blocked early, Firestore documents are retrieved and merged properly, and custom errors are returned with the correct HTTP status codes. This debugging process gave me deeper insight into how the code flows from request to response and how each layer handles errors or missing data.
