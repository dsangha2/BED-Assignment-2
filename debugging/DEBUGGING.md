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
  - This means it would send a 400 response to Postman.

### Analysis
- We learned how Joi quickly flags missing fields.
- Everything worked as intended: no unexpected behavior.
- Possibly I could unify error messages or add more fields to the schema.
- This scenario confirmed the request is stopped early if it fails validation.

## Scenario 2: Firestore Operations in `getEmployeeById`

- **Breakpoint Location:** `src/api/v1/services/employeeService.ts` line 55
- **Objective:** Watch how we retrieve an employee document from Firestore and transform it into an `Employee` object.

### Debugger Observations

- **Variable States:**
  - `id` contained the employee’s Firestore document ID (for example, `"abc123"`).
  - `docSnap` came from `firestoreRepo.getDocumentById("employees", id)`.
    - `docSnap.id` might be `"abc123"`.
    - `docSnap.data()` returned `{ name: "Alice", department: "IT", ... }`.

- **Call Stack:**
  1. `employeeController.getEmployeeById`
  2. `employeeService.getEmployeeById`
  3. `firestoreRepo.getDocumentById("employees", "abc123")`

- **Behavior:**
  - If Firestore finds the document, the service merges `{ id: docSnap.id, ...docSnap.data() }` into an `Employee` object.
  - If the document does not exist, the repository throws a `RepositoryError`, eventually becoming a 404 in our global error handler.

### Analysis

- This scenario showed exactly how Firestore data is turned into our `Employee` type.
- If the doc is missing, we get a `RepositoryError`, which leads to a 404 rather than a 500.
- Everything behaved as expected, confirming that `docSnap.data()` merges neatly into a typed object.
- Observing these variable states in the debugger gave us confidence that our Firestore logic is correct and aligned with our error-handling design.


## Scenario 3: Error Handling Middleware

- **Breakpoint Location:** `src/api/v1/middleware/errorHandler.ts` line 54
- **Objective:** Confirm how a `RepositoryError` travels through our global error handler and sets the correct HTTP status code.

### Debugger Observations

- **Variable States:**
  - `err` was a `RepositoryError` with `message = "Employee not found"` and `statusCode = 404`.
  - `res` was not yet populated at the moment of pausing. After the breakpoint, we set `res.status(err.statusCode)`.

- **Call Stack:**
  1. `employeeService.getEmployeeById` → doc not found
  2. `firestoreRepo.getDocumentById("employees", someId)` → throws `RepositoryError`
  3. `errorHandler(err, req, res, next)`

- **Behavior:**
  - The debugger paused where the code checks `if (err instanceof RepositoryError)`.
  - Because `err` was recognized as `RepositoryError`, it set `res.status(404)` and returned a JSON error.
  - If `err` was not recognized, it would have defaulted to a 500 status with “An unexpected error occurred.”

### Analysis

- Confirmed that missing docs lead to a `RepositoryError`, which is correctly translated into a 404 response.
- No unexpected behavior occurred everything matched design.
- Potential improvements could include adding more specific error codes or logs, but overall, it works fine.
- This scenario helped illustrate how custom errors bubble up from the repository to the service and finally to the global error handler, ensuring the client receives an appropriate status code and message.


# Conclusion

By stepping through these three scenarios Joi validation, Firestore operations, and error handling—we verified each layer of our application. I confirmed that invalid data is blocked early, Firestore documents are retrieved and merged properly, and custom errors are returned with the correct HTTP status codes. This debugging process gave me deeper insight into how the code flows from request to response and how each layer handles errors or missing data.
