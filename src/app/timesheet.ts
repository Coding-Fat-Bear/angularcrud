import { Time } from "@angular/common";

export class Timesheet {
    timeid : number;
    loginid : number;
    tsdate : Date;
    checkin : Time;
    checkout : Time;
    totalhours : number;
}
