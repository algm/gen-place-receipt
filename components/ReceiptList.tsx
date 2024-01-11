import Receipt from "./Receipt";

function chunkArray(array: string[], chunkSize: number): string[][] {
  const chunks: string[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export function ReceiptList({
  names,
  initialNumber,
}: {
  names: string[];
  initialNumber: number;
}) {
  const chunks = chunkArray(names, 8).map((chunkNames, chunkIndex) => {
    return (
      <>
        <div className="gap-0 grid-flow-row row-auto p-5 grid grid-cols-2 min-w-[294mm] min-h-[210mm] w-[285mm] print:p-0 print:w-[285mm] print:min-w-0 print:mb-[55mm]">
          {chunkNames.map((name, index) => (
            <Receipt
              key={name}
              name={name}
              number={chunkIndex * 8 + index + initialNumber}
            />
          ))}
        </div>
      </>
    );
  });

  return <>{chunks}</>;
}
