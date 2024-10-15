import { CurrencyPipe } from '@angular/common';
import { ElementRef, Injectable } from '@angular/core';

export default class Utils {
  getQueryParam(objectParam: any){
    return new URLSearchParams(objectParam).toString();
  }
  downloadFile(base64String){
    const aEle: ElementRef['nativeElement'] = document.createElement('a');
    document.body.appendChild(aEle);
    aEle.style = 'display: none';
    const rawFilecontent = base64String.content;
    const parts = rawFilecontent.split('base64');
    let tail = parts[parts.length - 1];
    tail = tail.replace(/(\r\n|\n|\r)/gm, '');

    const byteArray = Base64Binary.decode(tail);
    const blob = new Blob([byteArray]);

    const downloadUrl = window.URL.createObjectURL(blob);

    aEle.download = base64String.filename + base64String.extension;
    aEle.href = downloadUrl;
    aEle.click();
    URL.revokeObjectURL(aEle.href);
  }
}
export const Base64Binary = {
  _keyStr : 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

  /* will return a  Uint8Array type */
  decodeArrayBuffer(input) {
      const bytes = (input.length / 4) * 3;
      const ab = new ArrayBuffer(bytes);
      this.decode(input, ab);

      return ab;
  },

  removePaddingChars(input){
      const lkey = this._keyStr.indexOf(input.charAt(input.length - 1));
      if (lkey == 64){
          return input.substring(0, input.length - 1);
      }
      return input;
  },

  decode(input, arrayBuffer= null) {
      // get last chars to see if are valid
      input = this.removePaddingChars(input);
      input = this.removePaddingChars(input);

      const bytes = parseInt(String((input.length / 4) * 3), 10);

      let uarray;
      let chr1, chr2, chr3;
      let enc1, enc2, enc3, enc4;
      let i = 0;
      let j = 0;

      if (arrayBuffer) {
          uarray = new Uint8Array(arrayBuffer);
      }
      else {
          uarray = new Uint8Array(bytes);
      }

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

      for (i = 0; i < bytes; i += 3) {
          // get the 3 octects in 4 ascii chars
          enc1 = this._keyStr.indexOf(input.charAt(j++));
          enc2 = this._keyStr.indexOf(input.charAt(j++));
          enc3 = this._keyStr.indexOf(input.charAt(j++));
          enc4 = this._keyStr.indexOf(input.charAt(j++));

          // tslint:disable-next-line:no-bitwise
          chr1 = (enc1 << 2) | (enc2 >> 4);
          // tslint:disable-next-line:no-bitwise
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          // tslint:disable-next-line:no-bitwise
          chr3 = ((enc3 & 3) << 6) | enc4;

          uarray[i] = chr1;
          if (enc3 != 64) { uarray[i + 1] = chr2; }
          if (enc4 != 64) { uarray[i + 2] = chr3; }
      }

      return uarray;
  }
};
@Injectable()
export class CurrencyIDR {
  constructor(){}
  format(e: any){
    let currencyPipe = new CurrencyPipe('id-ID');
    return currencyPipe.transform(e, 'IDR', '', '0.2-2');
  }
}

export const generateRandomRGB = () => {
    const r = Math.floor(Math.random() * 256); // Nilai Red (0-255)
    const g = Math.floor(Math.random() * 256); // Nilai Green (0-255)
    const b = Math.floor(Math.random() * 256); // Nilai Blue (0-255)
    return `${r},${g},${b}`;
}
export const getUniqueDimensiIds = (data: any[]): number[] => {
    const uniqueDimensiIds = new Set<number>();
    data.forEach(item => {
        uniqueDimensiIds.add(item.dimensi_id);
    });
    return Array.from(uniqueDimensiIds);
}
export const filterMin = (data: any[]): any[] => {
    const minMinValue = Math.min(...data.map(item => item.minvalue));
    return data.filter(item => {
        if (minMinValue < 3) {
            return item.minvalue <= minMinValue;
        } else {
            return item.minvalue === minMinValue;
        }
    });
}
