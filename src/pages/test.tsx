import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

const TestTRCP = () => {
  const { data: sessionData } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          adiccion test
        </h1>
        {sessionData ? <UserInfo /> : "CARGANDO"}
        <div className="flex flex-col items-center gap-2">
          <AuthShowcase />
        </div>
      </div>
    </main>
  );
};

export default TestTRCP;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};



const UserInfo = () => {
  const getUserInfo = api.example.getUserInfo.useQuery();
  const getUserAdicction = api.example.getUserAdicction.useQuery();

  const setUserAdicction = api.example.setUserAdicction.useMutation({
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["todo", { id: variables.id }], data);
    },
  });
  const deleteUserAdicction = api.example.deleteUserAdicction.useMutation({
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["todo", { id: variables.id }], data);
    },
  });
  const setRelapse = api.example.setRelapse.useMutation({
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["todo", { id: variables.id }], data);
    },
  });

  console.log("\n\n", "# getUserInfo", getUserInfo, "\n\n");
  console.log("\n\n", "# getUserAdicction", getUserAdicction, "\n\n");

  const onGetUserInfo = () => {
    getUserInfo.refetch();
  };

  const onGetUserAdicction = () => {
    getUserAdicction.refetch();
  };

  const onSetUserAdicction = () => {
    setUserAdicction.mutate({
      type: `falopeeetaaaa ${getUserAdicction.data?.relapses}`,
    });
  };

  const onDeleteUserAdicction = () => {
    deleteUserAdicction.mutate();
  };

  const onSetRelapse = () => {
    setRelapse.mutate();
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
      <div className="flex flex-col">
        <button
          className="bg-white/10 p-4 text-white hover:bg-white/20"
          onClick={onSetUserAdicction}
        >
          <h3 className="text-2xl font-bold">crear/modificar adiccion</h3>
        </button>
        <ShowDataInfo data={setUserAdicction} />
      </div>
      <div className="flex flex-col">
        <button
          className="bg-white/10 p-4 text-white hover:bg-white/20"
          onClick={onDeleteUserAdicction}
        >
          <h3 className="text-2xl font-bold">borrar adiccion</h3>
        </button>
        <ShowDataInfo data={deleteUserAdicction} />
      </div>
      <div className="flex flex-col">
        <button
          className="bg-white/10 p-4 text-white hover:bg-white/20"
          onClick={onGetUserAdicction}
        >
          <h3 className="text-2xl font-bold">traer adiccion</h3>
        </button>
        <ShowDataInfo data={getUserAdicction} />
      </div>
      <div className="flex flex-col">
        <button
          className="bg-white/10 p-4 text-white hover:bg-white/20"
          onClick={onSetRelapse}
        >
          <h3 className="text-2xl font-bold">darle una vuelta</h3>
        </button>
        <ShowDataInfo data={setRelapse} />
      </div>
      <div className="flex flex-col">
        <button
          className="bg-white/10 p-4 text-white hover:bg-white/20"
          onClick={onGetUserInfo}
        >
          <h3 className="text-2xl font-bold">traer datos usuario</h3>
        </button>
        <ShowDataInfo data={getUserInfo} />
      </div>
    </div>
  );
};

const ShowDataInfo: React.FC = ({ data }: { data: any }) => {
  if (data.isIdle) return <p className="text-info">No hago nada...</p>;
  if (data.isLoading) return <p className="text-success">CARGANDOOO....</p>;
  if (data.isError) return <p className="text-error">{data.error.message}</p>;

  return (
    <p
      style={{
        maxWidth: 700,
        wordWrap: "break-word",
      }}
    >
      {JSON.stringify(data.data)}
    </p>
  );
};
