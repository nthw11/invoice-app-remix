import type { User, Note, Invoice, LineItem } from "@prisma/client";

import { prisma } from "~/db.server";

export function getLineItem({
  id,
  userId,
}: Pick<LineItem, "id"> & {
  userId: User["id"];
}) {
  return prisma.note.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function createLineItem({
  invoiceId,
  description,
  quantity,
  unitPrice,
  amount,
  date,
  startTime,
  endTime,
  taskOrShow,
  linePO,
  lineTotal,
}: {
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  taskOrShow: string;
  linePO: string;
  lineTotal: number;
}) {
  return prisma.lineItem.create({
    data: {
      description,
      quantity,
      unitPrice,
      amount,
      date,
      startTime,
      endTime,
      taskOrShow,
      linePO,
      lineTotal,
      invoice: {
        connect: {
          id: invoiceId,
        },
      },
    },
  });
}

export function deleteLineItem({
  id,
  invoiceId,
}: Pick<LineItem, "id"> & { invoiceId: Invoice["id"] }) {
  return prisma.lineItem.deleteMany({
    where: { id, invoiceId },
  });
}
