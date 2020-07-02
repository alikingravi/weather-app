export const handleErrors = (err) => {
  let error = { status: "", statusText: "", message: "" };
  if (err.response) {
    console.log("Problem with response");
    error = {
      status: err.response.status,
      statusText: err.response.statusText,
      message: err.response.data.error.message,
    };
  } else if (err.request) {
    console.log("Problem with Request ");
  } else {
    console.log("Error: ", err.message);
  }

  return error;
};
