import Receipt from "./Receipt";

export function ReceiptList({
  names,
  initialNumber,
}: {
  names: string[];
  initialNumber: number;
}) {
  return (
    <div className="p-5 grid grid-cols-2 min-w-[297mm] min-h-[210mm] w-[297mm]">
      {names.map((name, index) => (
        <Receipt key={name} name={name} number={index + initialNumber} />
      ))}
    </div>
  );
}
