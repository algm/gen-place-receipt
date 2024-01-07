import React, { useCallback, useMemo, useState } from "react";

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
      <form onSubmit={handleSubmit}>
        <input type="text" name="initialNumber" defaultValue={1} />
        <textarea
          name="names"
          placeholder="Enter names separated by newline characters"
          required
        />
        <button type="submit">Submit</button>
      </form>
    ),
    [targetRoute]
  );
}

export default ReceiptForm;
