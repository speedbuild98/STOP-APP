import Image from "next/image";
import { Logo } from "~/assets";
import AuthShowcase from "./AuthShowcase";
import Link from "next/link";

const LoginComponent = () => {
  return (
    <>
      <h1 className="title text-7xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        STOP APP
      </h1>
      <Link target="_blank" href="https://github.com/speedbuild98/STOP-APP" className="tooltip tooltip-accent font-bold" data-tip="would you give us a star on Github?">
        <Image src={Logo} alt="Logo Stop-APP" width={150} height={150} />
      </Link>
      <AuthShowcase />
    </>
  );
};

export default LoginComponent;
