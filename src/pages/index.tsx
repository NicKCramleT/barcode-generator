import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import JsBarcode from 'jsbarcode';

const BarcodeGenerator = () => {
  const [inputNumber, setInputNumber] = useState<string>('');
  const barcodeRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    generateBarcode();
  }, [inputNumber]);

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
        
        <br /><br />
        <canvas id="barcode" ref={barcodeRef} />
        {inputNumber && <p className="message">Generated barcode for: {inputNumber}</p>}
      </main>
    </div>
  );
};

export default BarcodeGenerator;
