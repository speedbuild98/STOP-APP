import { BsFillHeartPulseFill } from "react-icons/bs";
import { api } from "../utils/api";

const Stats = () => {
  // Interfaz para representar la estructura de datos de la adicción
  interface Addiction {
    id: string;
    userId: string;
    name: string;
    lastTime: Date;
    relapses: number;
    created: Date;
  }

  // Consulta la adicción del usuario actual y proporciona una función para volver a consultar los datos
  const { data: addiction, refetch: refetchAddiction } =
    api.addiction.getUserAddiction.useQuery();

  // Mutación para registrar una recaída en la adicción
  const setRelapse = api.addiction.setRelapse.useMutation({
    onSuccess: () => {
      void refetchAddiction();
    },
  });

  // Manejador de eventos para registrar una recaída en la adicción
  const handleRelapse = () => {
    setRelapse.mutate();
  };

  return (
    <div className="flew-row flex h-[70px] w-full items-center justify-between border-b border-t border-secondary px-[20px] md:max-w-[700px]">
      <div className="my-auto grid w-full grid-cols-3 gap-4">
        <div className="flex flex-1 flex-col">
          <p className="font-black uppercase text-secondary">Best</p>
          <span className="flex items-center font-black">
            {addiction?.best}
            <p className="ml-1 font-light">Days</p>
          </span>
        </div>
        <div className="flex flex-1 justify-center">
          <button
            className="btn-accent btn-circle btn animate-pulse border-4"
            onClick={() => window.my_modal_3.showModal()}
          >
            <BsFillHeartPulseFill className="h-7 w-7 text-neutral" />
          </button>
          <dialog id="my_modal_3" className="modal">
            <form method="dialog" className="modal-box md:flex md:flex-col">
              <button className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2">
                ✕
              </button>
              <h3 className="text-lg font-bold uppercase text-error md:text-center md:text-5xl">
                Relapse
              </h3>
              <p className="py-4 text-warning md:text-center">
                This will erase your progress so far, are you sure?
              </p>
              <button onClick={handleRelapse} className="btn-error btn">
                Yes, I will come back stronger!
              </button>
              <button className="btn-primary btn mt-4">
                Nah, just kidding!
              </button>
            </form>
          </dialog>
        </div>
        <div className="flex flex-col items-end justify-end">
          <p className="font-black uppercase text-secondary">Relapses</p>
          <span className="flex items-center justify-end font-black">
            {addiction?.relapses}
            <p className="ml-1 font-light">
              {addiction?.relapses === 1 ? "Time" : "Times"}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
