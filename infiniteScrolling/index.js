const container = document.getElementById("container");
let inputIndexHolder = document.getElementById("indexHolder").value;
let mainBody = document.getElementById("mybody");
console.log(myObj[1]);

let imgarr = ["https://free4kwallpapers.com/uploads/originals/2018/02/22/museum-of-pop-culture-seattle-taken-by-me-wallpaper.jpg", "https://free4kwallpapers.com/uploads/originals/2019/08/26/louvre-art-museum-at-paris-france-wallpaper.jpg", "https://wallpaperaccess.com/full/6984584.jpg"];
mainBody.setAttribute("style", `background-image: url("https://free4kwallpapers.com/uploads/originals/2018/03/18/valencia-museum-of-science-wallpaper.jpg");`);

function autoComplete() {
  let searchInput = document.getElementById("sreachInput").value;
  let datalist = document.getElementById("datalist");
  let myOpstions = myObj.filter((word) => word.Name.includes(searchInput));

  loadList(10, myOpstions);
  console.log(myOpstions);

  myOpstions.forEach((place) => {
    const option = document.createElement("option");
    option.innerText = place.Name;
    option.onclick = () => {
      document.getElementById("sreachInput").value = option.innerText;
      // container.innerHTML = "";
      // // container.remove();
      // container.setAttribute("style", "   display: none;");
    };
    datalist.append(option);
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function strReplacementsBugs(str) {
  String.prototype.replaceBetween = function (start, end, replacement) {
    return this.substring(0, start) + replacement + this.substring(end);
  };
  let opening = str.indexOf("<");
  let closeing = str.indexOf(">");
  while (opening != -1) {
    str = str.replaceBetween(opening, closeing + 1, "");
    opening = str.indexOf("<");
    closeing = str.indexOf(">");
  }
  return str;
}

function loadList(numboxes = 12, ArrayobjectsFronInput = [], breackboolean) {
  console.log(numboxes);
  let i = 0;
  let index = parseInt(inputIndexHolder);
  // console.log(myObj.length - 1);
  // console.log(myObj[index]);

  if (ArrayobjectsFronInput.length == 0) {
    ArrayobjectsFronInput = myObj;
    // numboxes = 12;
  } else if (ArrayobjectsFronInput.length < 12) {
    numboxes = ArrayobjectsFronInput.length;
    console.log("numboxes= " + numboxes);
  }

  while (i < numboxes && breackboolean) {
    console.log("i =" + i);
    // if (i > numboxes) break;
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    div.setAttribute("style", " direction: rtl; font-weight: bold; font-family: Alef Hebrew, sans-serif; margin: 25px; border: 2px solid; border-color: black; color: white; width: 50vh; max-height: fit-content;");
    div.setAttribute("id", "DivcontentResize");

    div.onmouseover = () => {
      div.setAttribute("style", " background-color:rgba(255, 166, 0, 0.4); opacity: 2; transform: scale(1); direction: rtl; font-weight: bold; font-family: Alef Hebrew, sans-serif; margin: 3px; border: 2px solid; border-color: black; color: white; width: 60vh; max-height: fit-content+10px;");
    };
    div.onmouseout = () => {
      div.setAttribute("style", "direction: rtl; font-weight: bold; font-family: Alef Hebrew, sans-serif; margin: 25px; border: 2px solid; border-color: black; color: white; width: 48vh; max-height: fit-content;");
    };
    h2.innerText = ArrayobjectsFronInput[index].Name;

    mystr = ArrayobjectsFronInput[index].FullDescription;
    mystr = strReplacementsBugs(mystr);

    p.innerText = mystr;
    div.append(h2, p);
    container.append(div);

    if (index === 609) index = 1;
    index++;
    inputIndexHolder = index;
    i++;
  }
}

// listen for scroll event and load more div if we reach the bottom of window
window.addEventListener("scroll", () => {
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50) {
    console.log("scroll");
    loadList(12, [], true);
    let x = getRandomInt(imgarr.length);
    console.log(x);
    mainBody.setAttribute("style", `background-image: url(${imgarr[x]});`);
  }
});

// At the first time the website loaded
window.onload = () => {
  console.log("load mode");
  loadList(12, [], true);
};
