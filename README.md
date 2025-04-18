# Voting System API Documentation

This is the backend API for the voting system. All endpoints are prefixed with `/api/v1`.

## Authentication Endpoints

### POST /auth/login
Authenticates a user in the system.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
- `200 OK`: Authentication successful
- `4xx/5xx`: Authentication failed

### POST /auth/logout
Ends the current user session. Requires authentication.

**Response:**
- `200 OK`: Logout successful
- `401 Unauthorized`: Not authenticated
- `4xx/5xx`: Logout failed

### POST /auth/change-password
Changes the password for the authenticated user. Requires authentication.

**Response:**
- `200 OK`: Password changed successfully
- `401 Unauthorized`: Not authenticated
- `4xx/5xx`: Password change failed

### GET /auth/check-auth
Verifies if the current session is valid. Requires authentication.

**Response:**
- `200 OK`: Authenticated
- `401 Unauthorized`: Not authenticated

## Voter Endpoints

### GET /voters
Lists all voters with pagination.

**Query Parameters:**
- `offset` (optional): Number of records to skip (default: 0)
- `limit` (optional): Number of records per page (default: 10)

**Response:**
- `200 OK`: List of voters with pagination info
- `404 Not Found`: No voters found
- `500`: Server error

### GET /voters/:document
Gets a specific voter by their document number.

**Parameters:**
- `document`: The voter's document number

**Response:**
- `200 OK`: Voter details
- `400 Bad Request`: Invalid document
- `404 Not Found`: Voter not found
- `500`: Server error

### POST /voters
Creates a new voter. Requires authentication.

**Request Body:**
```json
{
  "document": "string",
  "name": "string",
  "lastName": "string",
  "dateOfBirth": "date",
  "address": "string",
  "phone": "string",
  "sex": "M" | "F",
  "isCandidate": 0 | 1
}
```

**Response:**
- `201 Created`: New voter id
- `400 Bad Request`: Invalid data or voter already exists
- `401 Unauthorized`: Not authenticated
- `500`: Server error

## Candidate Endpoints

### GET /candidates
Lists all candidates with pagination.

**Query Parameters:**
- `offset` (optional): Number of records to skip (default: 0)
- `limit` (optional): Number of records per page (default: 10)

**Response:**
- `200 OK`: List of candidates with pagination info
- `404 Not Found`: No candidates found
- `500`: Server error

### GET /candidates/votes
Gets the vote count for each candidate. Requires authentication.

**Query Parameters:**
- `offset` (optional): Number of records to skip (default: 0)
- `limit` (optional): Number of records per page (default: 10)

**Response:**
- `200 OK`: List of candidates with their vote counts
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: No candidates found
- `500`: Server error

## Vote Endpoints

### GET /votes
Lists all votes with pagination. Requires authentication.

**Query Parameters:**
- `offset` (optional): Number of records to skip (default: 0)
- `limit` (optional): Number of records per page (default: 10)

**Response:**
- `200 OK`: List of votes with pagination info
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: No votes found
- `500`: Server error

### POST /votes
Records a new vote.

**Request Body:**
```json
{
  "voterId": "number",
  "candidateId": "number"
}
```

**Response:**
- `201 Created`: New vote id
- `400 Bad Request`: Invalid data or voter has already voted
- `500`: Server error

### GET /votes/detailed
Gets detailed information about votes with pagination. Requires authentication.

**Query Parameters:**
- `offset` (optional): Number of records to skip (default: 0)
- `limit` (optional): Number of records per page (default: 10)

**Response:**
- `200 OK`: List of detailed votes with pagination info
- `401 Unauthorized`: Not authenticated
- `404 Not Found`: No detailed votes found
- `500`: Server error