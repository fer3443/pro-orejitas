import crypto from 'crypto'
export function generateTokenPair(){
  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  return {token, tokenHash}
}