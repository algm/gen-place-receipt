import React, { useCallback, useMemo, useState } from "react";
import { Button } from "./Button";

export function ReceiptForm({
  onSubmit,
}: {
  onSubmit: (names: string[], initialNumber: number) => void;
}) {
  const targetRoute = "/receipts";
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const names = formData.get("names") as string;
      const initialNumber = parseInt(
        formData.get("initialNumber")?.toString() ?? "1"
      );

      const clearNames = names
        .trim()
        .split("\n")
        .map((name) => name.trim())
        .filter((name) => !!name && name.length && name != "" && name !== "\r");

      onSubmit([...new Set(clearNames)], initialNumber);
    },
    [onSubmit]
  );

  return useMemo(
    () => (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-3 max-w-lg"
      >
        <div className="space-y-1">
          <label
            htmlFor="initialNumber"
            className="block text-base font-medium"
          >
            Número inicial
          </label>
          <input
            type="text"
            id="initialNumber"
            name="initialNumber"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-2 text-base font-medium outline-none focus:border-[#6A64F1] focus:shadow-md"
            defaultValue={1}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="names" className="block text-base font-medium">
            Nombres
          </label>
          <textarea
            id="names"
            name="names"
            placeholder="Un nombre por línea"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-2 text-base font-medium outline-none focus:border-[#6A64F1] focus:shadow-md"
            required
          />
        </div>
        <Button type="submit">Generar</Button>
      </form>
    ),
    [targetRoute]
  );
}

export default ReceiptForm;
