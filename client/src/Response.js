import React, { useEffect, useState } from "react";

const Response = () => {
  const [apiResponse, setApiResponse] = useState("");
  useEffect(() => {
    fetch("http://localhost:9000/testapi")
      .then((response) => {
        debugger;
        return response.text();
      })
      .then((response) => setApiResponse(response));
  }, []);
  return <div>Response: {apiResponse}</div>;
};

export default Response;
