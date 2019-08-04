import { Injectable } from '@angular/core';

@Injectable()
export class SorterService {
  constructor() { }

  sortBy(prop: string, direction: number, collection: any[]) {
    let aVal: any;
    let bVal: any;
    if(prop == "score") { 
      return collection.sort((a: any, b: any) => {
        [aVal, bVal] = (direction == -1) ? [b[prop], a[prop]] : [a[prop], b[prop]];
        return aVal - bVal;
      });
    } else {
      return collection.sort((a: any, b: any) => {
        aVal = a[prop];
        bVal = b[prop];
        if (this.isString(aVal)) { aVal = aVal.trim().toUpperCase(); }
        if (this.isString(bVal)) { bVal = bVal.trim().toUpperCase(); }
        
        if(aVal == bVal) {
          return 0;
        } else if(aVal > bVal) {
          return direction * -1;
        } else {
          return direction * 1;
        }
      }); 
    }
  }

  isString(val: any): boolean {
    return (val && (typeof val === 'string' || val instanceof String));
  }
}

