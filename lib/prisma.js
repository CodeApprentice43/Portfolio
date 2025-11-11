import { PrismaClient } from "@prisma/client";

const globalForPrisma = global

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; //save the prisma client for hot reloads in dev environment



