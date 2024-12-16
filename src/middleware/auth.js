import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export const authenticate = (handler) => async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; 

    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
