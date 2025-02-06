import logger from "./logger.mjs";

export const errorHandler = (err, req, res, next) => {
  logger.error(`Error: $`);
  res.status(500).json({ message: 'Internal server error!' });
};