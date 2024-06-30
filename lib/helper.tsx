import React from 'react';
import { findSingleUser } from '@/actions/user-actions';
import { verifyAuth } from './auth';

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

export async function currentUser() {
  var currentUser;
  const result = await verifyAuth();
  if (result.user) {
    currentUser = await findSingleUser(result.user.id);
  }
  return currentUser;
}

export const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : 'an error occurred',
  };
};
