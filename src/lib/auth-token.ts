import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

export const signToken = (payload: object) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1d'
  })
  return token
}

export const verifyToken = (token:string) => {
  return jwt.verify(token, JWT_SECRET)
}