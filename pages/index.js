import { useCallback, useState } from "react";
import Head from "next/head";
import ReceiptForm from "../components/ReceiptForm";
import { ReceiptList } from "../components/ReceiptList";

export default function Home() {
  const [names, setNames] = useState([]);
  const [initialNumber, setInitialNumber] = useState(1);

  const handleSubmit = useCallback((names, initialNumber) => {
    setNames(names);
    setInitialNumber(initialNumber);
    window.print();
  });

  return (
    <div className="container">
      <Head>
        <title>Papeleta de sitio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="print:hidden">
          <ReceiptForm onSubmit={setNames} />
        </div>
        <div>
          {names.length > 0 && (
            <ReceiptList names={names} initialNumber={initialNumber} />
          )}
        </div>
      </main>
    </div>
  );
}
