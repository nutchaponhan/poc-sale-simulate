export class RiderAgent {
  setlen(s, n) {
    s = s + '';
    while (s.length < n) {
      s = '0' + s;
    }

    return s;
  }

  rshift(s, n, _k) {
    s = s + '';
    s = s.substring(0, s.length - n);
    let i = 0;
    while (i < n) {
      s = '0' + s;
      i++;
    }
    return s;
  }

  lshift(s, n, _k = 0) {
    s = s + '';
    s = s.substring(n);
    let i = 0;
    while (i < n) {
      s = s + '0';
      i++;
    }

    return s;
  }
}
