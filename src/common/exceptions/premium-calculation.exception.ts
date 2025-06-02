import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export enum PremiumCalculationErrorCode {
  INVALID_INPUT = 'PREMIUM_CALC_INVALID_INPUT',
  CALCULATION_FAILED = 'PREMIUM_CALC_FAILED',
  RATE_NOT_FOUND = 'PREMIUM_CALC_RATE_NOT_FOUND',
  VALIDATION_FAILED = 'PREMIUM_CALC_VALIDATION_FAILED',
}

export class PremiumCalculationException extends BaseException {
  constructor(
    message: string,
    code: PremiumCalculationErrorCode,
    details?: Record<string, any>,
  ) {
    super(message, HttpStatus.BAD_REQUEST, code, details);
  }
}

// Specific Premium Calculation Exceptions
export class InvalidPremiumInputException extends PremiumCalculationException {
  constructor(details?: Record<string, any>) {
    super(
      'Invalid input parameters for premium calculation',
      PremiumCalculationErrorCode.INVALID_INPUT,
      details,
    );
  }
}

export class PremiumCalculationFailedException extends PremiumCalculationException {
  constructor(details?: Record<string, any>) {
    super(
      'Premium calculation failed',
      PremiumCalculationErrorCode.CALCULATION_FAILED,
      details,
    );
  }
}

export class PremiumRateNotFoundException extends PremiumCalculationException {
  constructor(details?: Record<string, any>) {
    super(
      'Premium rate not found for the given criteria',
      PremiumCalculationErrorCode.RATE_NOT_FOUND,
      details,
    );
  }
}

export class PremiumValidationFailedException extends PremiumCalculationException {
  constructor(details?: Record<string, any>) {
    super(
      'Premium validation failed',
      PremiumCalculationErrorCode.VALIDATION_FAILED,
      details,
    );
  }
}
