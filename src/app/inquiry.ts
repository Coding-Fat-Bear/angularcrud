export class Inquiry {
    inqno: number;
    ccod: string;
    empno: number;
    prjdes: string;
    assnper: string;
    bizid: string;
    modul: string;
    lngid: string;
    frmdt: string;
    todt: string;
    posbper: string;
    prjsts: string;
    phaseid: string;
    estmamt: number;
    curr: string;
    tax: number;
    unit: string;
    qty: number;
    rate: number;
    custno: string;
    eusrno: string;
    custinfo: string;
    remarks: string;
   /*  credt: string;
    cretim: string; */

    constructor(inqno: number, ccod: string, empno: number, prjdes: string, assnper: string, 
        bizid: string, modul: string, lngid: string, frmdt: string, todt: string, posbper: string, 
        prjsts: string, phaseid: string, estmamt: number, curr: string, tax: number, unit: string,
        qty: number, rate: number, custno: string, eusrno: string, custinfo: string, remarks: string/* , credt: string, cretim: string */)
    {
        this.inqno = inqno;
        this.ccod = ccod;
        this.empno = empno;
        this.prjdes = prjdes;
        this.assnper = assnper;
        this.bizid = bizid;
        this.modul = modul;
        this.lngid = lngid;
        this.frmdt = frmdt;
        this.todt = todt;
        this.posbper = posbper;
        this.prjsts = prjsts;
        this.phaseid = phaseid;
        this.estmamt = estmamt;
        this.curr = curr;
        this.tax = tax;
        this.unit = unit;
        this.qty = qty;
        this.rate = rate;
        this.custno = custno;
        this.eusrno = eusrno;
        this.custinfo = custinfo;
        this.remarks = remarks;
       /*  this.credt = credt;
        this.cretim = cretim; */
    }

}

export class Module {
   modul: string;
   mod_text: string;

   constructor(modul: string, mod_text: string)
   {
     this.modul = modul;
     this.mod_text = mod_text;
   }
}

export class BusinessLine {
    bizid: string;
    biz_text: string;

    constructor(bizid: string, biz_text: string) {
        this.bizid = bizid;
        this.biz_text = biz_text;
    }
}

export class Language {
    lngid: string;
    lng_text: string;

    constructor(lngid: string, lng_text: string) {
        this.lngid = lngid;
        this.lng_text = lng_text;
    }
}

export class Phase {
    phaseid: string;
    phase: string;

    constructor(phaseid: string, phase: string) {
        this.phaseid = phaseid;
        this.phase = phase;
    }
}

export class Currency {
    curr: string;
    currency: string;

    constructor(curr: string, currency: string) {
        this.curr = curr;
        this.currency = currency;
    }
}

export class Unit {
    unit: string;
    unittext: string;

    constructor(unit: string, unittext: string) {
        this.unit = unit;
        this.unittext = unittext;
    }
}