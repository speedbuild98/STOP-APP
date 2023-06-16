import { useSession } from "next-auth/react";
import { AuthShowcase } from "./";

const Avatar = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="avatar mt-[40px] flex flex-col items-center justify-center">
      <div className="w-[60px] cursor-pointer rounded-full ring-2 ring-accent ring-offset-2 ring-offset-base-100">
        <img
          src={sessionData.user.image}
          alt="avatar"
          onClick={() => window.my_modal_5.showModal()}
        />
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <form
            method="dialog"
            className="modal-box flex flex-col items-center justify-center"
          >
            <div className="modal-action absolute right-[20px] top-0">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2">
                ✕
              </button>
            </div>
            <div className="avatar flex flex-col items-center justify-center">
              <div className="w-[100px] rounded-full ring-2 ring-secondary ring-offset-2 ring-offset-base-100">
                <img src={sessionData?.user.image} alt="avatar" />
              </div>
            </div>
            <h3 className="mt-3 text-lg font-bold text-secondary">
              {sessionData?.user.name}
            </h3>
            <h4 className="text-xs font-light">{sessionData?.user.email}</h4>
            <p className="py-4">
              <AuthShowcase />
            </p>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default Avatar;
