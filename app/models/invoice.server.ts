import type { User, Note, Invoice, Vendor, LineItem } from "@prisma/client";

import { prisma } from "~/db.server";

export function getInvoice({
  id,
  userId,
}: Pick<Invoice, "id"> & {
  userId: User["id"];
}) {
  return prisma.note.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function createInvoice({
  id,
  invoiceLabel,
  invoiceNumber,
  userId,
  poNumber,
  invoiceDate,
  dueDate,
  lineItems,
  user,
  invoiceTotal,
  vendor,
}: {
  id: string;
  invoiceLabel: string;
  invoiceNumber: string;
  userId: User["id"];
  poNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  lineItems: LineItem["id"][];
  invoiceTotal: number;
  vendor: Vendor["id"];
  user: User["id"];
}) {
  return prisma.invoice.create({
    data: {
      invoiceLabel,
      invoiceNumber,
      poNumber,
      invoiceDate,
      dueDate,
      invoiceTotal,
      vendor: {
        connect: {
          id: vendor,
        },
      },
      lineItems: {
        connect: {
          id: id,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteInvoice({
  id,
  userId,
}: Pick<Invoice, "id"> & { userId: User["id"] }) {
  return prisma.invoice.deleteMany({
    where: { id, userId },
  });
}
