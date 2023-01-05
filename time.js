function date() {
  const d = new Date(),
    dateFormat = [d.getMonth() + 1, d.getDate(), d.getFullYear()].join("/") + " " + [d.getHours(), d.getMinutes(), d.getSeconds()].join(":");
  return dformat;
}

console.log(date());
