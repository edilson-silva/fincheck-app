import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../Router/constants";

interface AuthFormProps {
  title: string;
  subtitle: string;
  linkTitle: string;
  linkTo: AppRoutes;
  children: ReactNode;
}

export function AuthForm({
  title,
  subtitle,
  linkTitle,
  linkTo,
  children,
}: AuthFormProps) {
  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-[-1px]">
          {title}
        </h1>
        <p className="space-x-2">
          <span className="text-gray-700 text-base font-normal tracking-[-0.5px]">
            {subtitle}
          </span>
          <Link
            to={linkTo}
            className="text-teal-900 text-base font-medium tracking-[-0.5px]"
          >
            {linkTitle}
          </Link>
        </p>
      </header>
      <form className="mt-[60px] flex flex-col gap-4">{children}</form>
    </>
  );
}
