import { useState, useEffect } from "react";
import axios from "axios";

async function fetcher(setData) {
  try {
    const response = await axios.post("/api/hello", { hello: "world" });

    setData(response.data);
  } catch (err) {
    setData(err.message);
  }
}

export default function HelloApi() {
  const [data, setData] = useState();

  // Executa esta función cuando el componente se monte
  useEffect(() => {
    fetcher(setData);
  }, []);

  return (
    <>
      <input />
      {data === undefined ? (
        <p>Loading...</p>
      ) : (
        <p style={{ whiteSpace: "pre-wrap" }}>
          {JSON.stringify(data, null, 2)}
        </p>
      )}
    </>
  );
}
