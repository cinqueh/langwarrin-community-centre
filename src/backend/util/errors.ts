export class DatabaseError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'DatabaseError';
    }
}

export class DataValidationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'DataValidationError';
    }
}

export class NotImplementedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotImplementedError';
  }
}
