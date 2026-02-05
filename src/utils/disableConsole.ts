export const disableConsole = () => {
  console.log(import.meta.env?.MODE);
  if (import.meta.env.MODE === "production") {
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
    console.warn = () => {};
    // Keep console.error for critical errors
    // console.error = () => {};
  }
};
