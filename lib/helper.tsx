import React from 'react';
import { PrismaClient } from '@prisma/client';

interface OptionCardProps {
  title: string;
  description: string;
  href: string;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  title,
  description,
  href,
}) => {
  return (
    <a
      href={href}
      className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <h2 className="text-2xl font-semibold text-awi-blue mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </a>
  );
};

const prisma = new PrismaClient();

export async function initDb() {
  const entryCount = await prisma.group.count();
  if (entryCount == 0) {
    const createGroup = await prisma.group.createMany({
      data: [{ name: 'Administrator' }, { name: 'User' }],
    });
  }
}
