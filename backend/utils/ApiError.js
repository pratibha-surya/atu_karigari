class ApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    
    this.status = status;
    this.isOperational = true; 
    this.name = this.constructor.name; 
    
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
