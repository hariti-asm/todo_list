const dt = new Date();
const month = dt.getMonth() + 1;
const navbarList = [
  {
    name: "all",
    value: "all",
  },
  {
    name: "today",
    value: `${month}/${dt.getDate()}`,
  },

  {
    name: "status",
    value: "complete",
  },
  {
    name: "status",
    value: "pending",
  },
  {
    name: "priority",
    value: "priority 1",
  },
  {
    name: "priority",
    value: "priority 2",
  },
];
export default navbarList;
