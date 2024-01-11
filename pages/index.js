import { useCallback, useState } from "react";
import Head from "next/head";
import ReceiptForm from "../components/ReceiptForm";
import { ReceiptList } from "../components/ReceiptList";
import { Button } from "../components/Button";

export default function Home() {
  const [names, setNames] = useState([]);
  const [initialNumber, setInitialNumber] = useState(1);

  const handleSubmit = useCallback((names, initialNumber) => {
    setNames(names);
    setInitialNumber(initialNumber);
  });

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden print:overflow-visible">
      <Head>
        <title>Generador de papeletas de sitio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-center border-b border-purple-950 w-screen h-20 print:hidden p-1 bg-purple-800 text-white">
        <h1 className="text-3xl">Generador de papeletas de sitio</h1>
      </header>

      <main className="flex flex-1 flex-col w-screen min-h-screen p-3 print:p-0 print:block space-y-3 print:space-x-0 print:space-y-0">
        <div className="print:hidden">
          <ReceiptForm onSubmit={handleSubmit} />
        </div>
        {names.length && (
          <div className="print:hidden flex flex-row items-center justify-between max-w-lg">
            <div>
              <h2 className="text-lg font-bold">
                Papeletas de sitio generadas ({names.length})
              </h2>
            </div>
            <div>
              <Button onClick={() => window.print()}>Imprimir</Button>
            </div>
          </div>
        )}

        {names.length > 0 && (
          <div className="flex-1 flex flex-col max-w-screen print:max-w-2xl overflow-auto print:block print:overflow-visible print:w-[285mm]">
            <ReceiptList names={names} initialNumber={initialNumber} />
          </div>
        )}
      </main>
    </div>
  );
}
