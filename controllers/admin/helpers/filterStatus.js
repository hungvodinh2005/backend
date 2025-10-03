module.exports.filterStatus = () => {
  let filterStatus = [
    {
      name: "ALL",
      buttonStatus: "",
    },
    {
      name: "HOẠT ĐỘNG",
      buttonStatus: "active",
    },
    {
      name: "DỪNG HOẠT ĐỘNG",
      buttonStatus: "inactive",
    },
  ];
  return filterStatus;
};
