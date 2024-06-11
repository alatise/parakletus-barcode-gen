import { useRef, useState } from "react";
import Barcode from "react-barcode";
import jsPDF from "jspdf";
import { Input, Button, Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";
import "./index.css";

function App() {
  const [isbn, setIsbn] = useState("");
  const barcodeRef = useRef(null);

  const handleInputChange = (e) => {
    setIsbn(e.target.value);
  };

  // Function to format the ISBN
  const formatIsbn = (isbn) => {
    if (isbn.length === 13) {
      return `ISBN: ${isbn.slice(0, 3)}-${isbn.slice(3, 6)}-${isbn.slice(
        6,
        11
      )}-${isbn.slice(11, 12)}-${isbn.slice(12)}`;
    }
    return "ISBN: " + isbn;
  };

  const downloadImage = () => {
    const input = barcodeRef.current;
    html2canvas(input, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("barcode.pdf");
    });
  };

  return (
    <div className="flex flex-col gap-5 py-20 justify-center items-center px-4">
      <main className="flex flex-col gap-4 bg-white p-10 rounded-3xl">
        <p className="text-4xl">Barcode Generator</p>
        <Input
          value={isbn}
          onChange={handleInputChange}
          placeholder="Enter ISBN-13 code"
          className="text-black p-2 text-2xl border border-gray-400 rounded"
        />
        {isbn && isbn.length === 13 && (
          <div className="mt-5 text-center barcode-container" ref={barcodeRef}>
            <div className="font-bold text-lg mb-1">
              <span>{formatIsbn(isbn)}</span>
            </div>
            <div className="relative inline-block bg-white">
              <Barcode
                value={isbn}
                displayValue={false}
                height={100}
                width={1.8}
                margin={0}
              />
              <div className="absolute bottom-[-30px] left-0 right-0 flex  text-2xl font-semibold bg-white">
                <span style={{ marginLeft: -20 }}>{isbn[0]}</span>
                <span style={{ marginLeft: "10%" }}>{isbn.slice(1, 7)}</span>
                <span style={{ marginLeft: "15%" }}>{isbn.slice(7)}</span>
              </div>
              <div>
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
          </div>
        )}
        <Space className="mt-5 flex flex-col">
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={downloadImage}
          >
            Download PDF
          </Button>
        </Space>
      </main>
    </div>
  );
}

export default App;
