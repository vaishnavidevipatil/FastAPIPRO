import jwt from "jsonwebtoken"; 
 
// Secret key for JWT signing (should be securely stored) 
const secretKey = "your-secret-key"; 
 
// Authenticate the user and generate a JWT token 
export function login(username, password) { 
  // Replace with your own authentication logic 
  if (username === "admin" && password === "password") { 
        const token = jwt.sign({ username }, secretKey); 
        return token; 
      } 
      return null; 
} 
 
//optional: Verify the JWT token and return the decoded payload 
export function verifyToken(token) { 
  try { 
    const decoded = jwt.verify(token, secretKey); 
    return decoded; 
  } catch (error) { 
    return null; 
  } 
} 
