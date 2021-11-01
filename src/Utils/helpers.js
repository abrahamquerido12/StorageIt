export const helperFunctions = {
  GetFileExt: (file) => {
    var temp = file.name.split(".");
    var ext = temp.slice(0, 1).join(".");

    return "." + ext[0];
  },
  GetFileName: (file) => {
    var temp = file.name.split(".");
    var fname = temp.slice(0, -1).join(".");
    return fname;
  },
};
