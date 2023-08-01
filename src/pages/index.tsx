import { useState, useRef } from 'react';
import Head from 'next/head';
import JsBarcode from 'jsbarcode';

const BarcodeGenerator = () => {
  const [inputNumber, setInputNumber] = useState<string>('');
  const barcodeRef = useRef<HTMLCanvasElement | null>(null);

  const generateBarcode = () => {
    try {
      JsBarcode(barcodeRef.current, inputNumber, {
        format: "CODE128",
        displayValue: true,
        fontSize: 20,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputNumber(event.target.value);
  };

  return (
    <div className="container">
      <Head>
        <title>Barcode Generator</title>
      </Head>
      <main>
        <h1>Barcode Generator</h1>
        <input
          type="text"
          value={inputNumber}
          onChange={handleInputChange}
          placeholder="Enter a number"
        />
        <button onClick={generateBarcode}>Generate Barcode</button>
        <br /><br />
        <canvas id="barcode" ref={barcodeRef} />
        {inputNumber && <p className="message">Generated barcode for: {inputNumber}</p>}
      </main>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

        .container {
          font-family: 'Roboto', sans-serif;
        }

        main {
          max-width: 600px;
          margin: 0 auto;
        }

        input {
          width: 50%;
          box-sizing: border-box;
        }
      `}</style>

      <style jsx global>{`

        button:hover {
          background-color: #D9A243;
        }
      `}</style>
    </div>
  );
};

export default BarcodeGenerator;
