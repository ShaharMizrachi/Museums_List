mystr = 'The <p style="direction: rtl;"> Hello World <p style="direction: rtl;"> Code! <p style="direction: rtl;">';

function strReplacementsBugs(str) {
  String.prototype.replaceBetween = function (start, end, replacement) {
    return this.substring(0, start) + replacement + this.substring(end);
  };

  let opening = str.indexOf("<");
  let closeing = str.indexOf(">");
  console.log(opening);

  while (opening != -1) {
    str = str.replaceBetween(opening, closeing + 1, "");
    console.log(str);
    opening = str.indexOf("<");
    closeing = str.indexOf(">");
    console.log(opening);
    console.log(closeing);
  }
  return str;
}

console.log(strReplacementsBugs(mystr));
