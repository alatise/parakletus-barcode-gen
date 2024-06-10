import { useState } from "react";
import Barcode from "react-barcode";
import "./index.css";

function App() {
  const [isbn, setIsbn] = useState("");

  const handleInputChange = (e) => {
    setIsbn(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col gap-5 py-20 justify-center items-center  ">
        <p className="text-5xl text-[#a03535]">Barcode Generator</p>
        <input
          type="text"
          value={isbn}
          onChange={handleInputChange}
          placeholder="Enter ISBN-13 code"
          className="text-black p-2 text-2xl border border-gray-400 rounded"
        />
        {isbn && isbn.length === 13 && (
          <div className="mt-5 text-center barcode-container">
            <div style={{ position: "relative", display: "inline-block" }}>
              <Barcode
                value={isbn}
                displayValue={false}
                height={100}
                width={1.8}
                margin={0}
              />
              <div className="absolute bottom-[-30px] left-0 right-0 flex  text-2xl font-semibold">
                <span style={{ marginLeft: -20 }}>{isbn[0]}</span>
                <span style={{ marginLeft: "10%" }}>{isbn.slice(1, 7)}</span>
                <span style={{ marginLeft: "15%" }}>{isbn.slice(7)}</span>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  bottom: "-10px",
                  left: "0",
                  borderLeft: "2px solid black",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  bottom: "-10px",
                  left: "2%",
                  borderLeft: "2px solid black",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  bottom: "-10px",
                  left: "49%",
                  borderLeft: "2px solid black",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  bottom: "-10px",
                  left: "51%",
                  borderLeft: "2px solid black",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  bottom: "-10px",
                  left: "98%",
                  borderLeft: "2px solid black",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  bottom: "-10px",
                  left: "100%",
                  borderLeft: "2px solid black",
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
