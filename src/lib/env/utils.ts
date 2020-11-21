import * as bcrypt from 'bcryptjs';

export function hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err:any, hash:any) => {
            if (err) {
                return reject(err);
            }
            resolve(hash);
        });
    });
}

export function toNumber(value: string): number {
    return parseInt(value, 10);
}

export function toBool(value: string): boolean {
    return value === 'true';
}
