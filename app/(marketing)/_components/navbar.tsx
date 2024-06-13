import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme/ThemeToggle";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center dark:bg-slate-800">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <ThemeToggle />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">
              Войти
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">
              Получить бесплатно
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
