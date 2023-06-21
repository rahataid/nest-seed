import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Type,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { InsufficientScopeError, claimCheck } from 'express-oauth2-jwt-bearer';
import { ParsedQs } from 'qs';

function promisify<T>(fn: (...args: any[]) => void): () => Promise<T> {
  return (...args: any[]) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err: Error, result: T) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

function createPermissionsGuard(
  requiredRoutePermissions: string[],
): Type<CanActivate> {
  @Injectable()
  class PermissionsGuardImpl implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request: Request<
        ParamsDictionary,
        any,
        any,
        ParsedQs,
        Record<string, any>
      > = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse<Response>();

      const permissionCheck = promisify(
        claimCheck((payload) => {
          const permissionsJwtClaim = (payload.permissions as string[]) || [];

          const hasRequiredRoutePermissions = requiredRoutePermissions.every(
            (requiredRoutePermission) =>
              permissionsJwtClaim.includes(requiredRoutePermission),
          );

          if (!hasRequiredRoutePermissions) {
            throw new InsufficientScopeError();
          }

          return hasRequiredRoutePermissions;
        }),
      );

      try {
        await permissionCheck(request, response);

        return true;
      } catch (error) {
        throw new ForbiddenException('Permission denied');
      }
    }
  }

  return PermissionsGuardImpl;
}

export const PermissionsGuard = (
  routePermissions: string[],
): Type<CanActivate> => createPermissionsGuard(routePermissions);
