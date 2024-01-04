import { jsPDF } from "jspdf";

const HEADER_TEXT = "Banda del Stmo. Cristo de la Expiración";

type GetParams = {
  params: {
    filename: string;
  };
};

async function createHeader(doc: jsPDF, logoPath: string) {
  // Set the font size and style for the header text
  doc.setFontSize(10);

  // add the logo to the top left corner of the document in a 10mm box with a 5mm margin
  doc.addImage(logoPath, "JPEG", 5, 5, 8, 8);

  // Add the text to top next to the logo
  doc.text(HEADER_TEXT, 16, 10);
}

async function readLogo(baseUrl: string): Promise<Buffer> {
  const logoUrl = `${baseUrl}/escudo.jpeg`;
  const response = await fetch(logoUrl);
  const arrayBuffer = await response.arrayBuffer();

  return Buffer.from(arrayBuffer);
}

// export an async GET function. This is a convention in NextJS
export async function GET(req: Request, { params }: GetParams) {
  // filename for the file that the user is trying to download
  const filename = params.filename;
  const name = "Pepito Pérez";
  const amount = 10;

  // Usage example:
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a7",
  });

  // read base url from the request
  const baseUrl = new URL(req.url).origin;
  const logo = await readLogo(baseUrl);

  await createHeader(doc, logo.toString("base64"));

  const receiptText = `Recibí de ${name} la cantidad de ${amount} euros en concepto de PAPELETA DE SITIO y para que así conste se hace entrega del presente recibo.`;

  doc.setFontSize(8);

  // add a paragraph with receipt text, aligned left and max width of the width of an a7 with 5mm margin on each side
  doc.text(receiptText, 5, 20, { maxWidth: 95, align: "left" });

  // create a base64 string from the PDF document
  const base64 = doc.output("datauristring");

  // convert the base64 string to a buffer
  const buffer = Buffer.from(base64.split(",")[1], "base64");

  // return the PDF as a response
  return new Response(buffer, {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `attachment; filename="${filename}"`,
    },
  });
}
