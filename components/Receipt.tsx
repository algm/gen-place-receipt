import Image from "next/image";
import { useMemo } from "react";

export default function Receipt({
  name,
  number,
}: {
  name: string;
  number: number;
}) {
  const receiptNumber = useMemo(() => {
    const formattedNumber = number.toString().padStart(3, "0");
    return `${new Date().getFullYear()}${formattedNumber}`;
  }, [number]);

  return (
    <div
      key={name}
      className="outline-dashed h-[90mm] outline-1 bg-[url(/frame.svg)] bg-no-repeat bg-cover bg-[0] p-[15mm] space-y-[1mm] font-serif"
    >
      <div className="grid grid-cols-3 gap-[5mm] text-xs justify-center items-center">
        <div className="">
          Nº <span className="font-medium font-mono">{receiptNumber}</span>
        </div>
        <h1 className="text-lg font-bold uppercase underline text-center justify-center">
          Recibo
        </h1>
        <div className="text-right">
          Donativo: <span className="text-lg font-semibold">10€</span>
        </div>
      </div>
      <h2 className="text-lg text-center text-gray-500 uppercase">
        Papeleta de sitio
        <br />
        <span className="text-xl text-center text-gray-700  font-bold uppercase">
          Semana Santa 2025
        </span>
      </h2>
      <div className="text-sm">
        <p>
          Don/Doña <span className="uppercase font-semibold">{name}</span>{" "}
          acompañará a nuestros Sagrados Titulares en la Estación de Penitencia
          del Viernes Santo 2025 como{" "}
          <span className="font-semibold">
            componente de la Banda de Cabecera del Stmo. Cristo de la Expiración
          </span>
          .
        </p>
      </div>
      <div className="mt-[3mm] mx-[10mm] flex flex-row text-xs justify-between">
        <div>
          <p className="italic">El Fiscal,</p>
          <Image
            src="/signature.png"
            alt="firma fiscal"
            className="grayscale"
            width={75}
            height={40}
          ></Image>
        </div>
        <div className="justify-end text-right relative">
          <Image
            src="/escudo.svg"
            alt="escudo banda"
            className="grayscale"
            width={50}
            height={50}
          ></Image>
        </div>
      </div>
    </div>
  );
}
