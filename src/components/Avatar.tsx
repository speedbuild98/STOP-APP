import { useSession } from "next-auth/react";
import { AuthShowcase } from "./";
import Image from "next/image";
import { useRef } from "react";

declare global {
  interface Window {
    my_modal_5: {
      showModal: () => void;
    };
  }
}

const Avatar = () => {
  const { data: sessionData } = useSession();
const profileImage = sessionData?.user?.image || "";
const themeSelectRef = useRef<HTMLSelectElement | null>(null);

const handleThemeChange = () => {
  const selectedTheme = themeSelectRef.current?.value;
  // Actualizar el tema en la aplicación
  if (selectedTheme) {
    document.documentElement.setAttribute("data-theme", selectedTheme);
  }
};  


  const themes = [
    "night",
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "coffee",
    "winter",
  ];

  return (
    <div className="avatar mt-[40px] flex flex-col items-center justify-center">
      <div className="w-[60px] cursor-pointer rounded-full ring-2 ring-accent ring-offset-2 ring-offset-base-100">
        <Image
          src={profileImage}
          width={200}
          height={200}
          alt="avatar"
          onClick={() => window.my_modal_5?.showModal?.()}
        />
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <form
            method="dialog"
            className="modal-box flex flex-col items-center justify-center"
          >
            <div className="modal-action absolute right-[20px] top-0">
              <button className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2">
                ✕
              </button>
            </div>
            <div className="avatar flex flex-col items-center justify-center">
              <div className="w-[100px] rounded-full ring-2 ring-secondary ring-offset-2 ring-offset-base-100">
                <Image
                  width={200}
                  height={200}
                  src={profileImage}
                  alt="avatar"
                />
              </div>
            </div>
            <h3 className="mt-3 text-lg font-bold text-secondary">
              {sessionData?.user.name}
            </h3>
            <h4 className="text-xs font-light">{sessionData?.user.email}</h4>
            <p className="py-4">
              <AuthShowcase />
            </p>
            <div className="dropdown flex flex-col justify-center items-center mt-10">
              <select
                ref={themeSelectRef}
                className="select select-primary w-full max-w-xs"
              >
                {themes.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme.charAt(0).toUpperCase() + theme.slice(1)} Theme
                  </option>
                ))}
              </select>
              <button
                onClick={handleThemeChange}
                className="btn btn-primary btn-sm"
              >
                Change Theme
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default Avatar;
