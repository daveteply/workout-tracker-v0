'use client';

interface NavLinkButtonProps {
  title: string;
  link: string;
}

export const NavLinkButton = ({ link, title }: NavLinkButtonProps) => {
  return (
    <a
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1 capitalize"
      href={link}
    >
      {title}
    </a>
  );
};
