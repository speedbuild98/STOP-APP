import Image from "next/image";
import { Logo } from "~/assets";
import AuthShowcase from "./AuthShowcase";

const LoginComponent = () => {
  return (
        <>
          <h1 className="title text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            STOP APP
          </h1>
          <Image src={Logo} alt="Logo Stop-APP" width={150} height={150} />
          <AuthShowcase />
        </>
  );
};

export default LoginComponent;
