import { Gender, Permissions } from "../utils/Constants";
import { StudentClass } from "../utils/student";
import { School } from "./School";

export class EcoleDirecte {
  constructor(
    protected token: string,
    protected accessToken: string,

    readonly lastConnection: string,
    readonly gender: Gender,
    readonly firstName: string,
    readonly lastName: string,

    readonly email: string,

    readonly userId: number,
    readonly profilePicture: string,

    readonly hasAccessibility: boolean,
    readonly has2FA: boolean,

    readonly studentClass: StudentClass,

    readonly permissions: Permissions[],
    readonly school: School
  ) {}
}
