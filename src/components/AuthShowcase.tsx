import { useSession, signIn, signOut } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <button
      className="btn-secondary btn-outline btn block w-[289px]"
      onClick={sessionData ? () => void signOut() : () => void signIn()}
    >
      {sessionData ? (
        "Sign out"
      ) : (
        <span className="flex flex-row items-center justify-center">
          Sign in With
          <FaGithub className="ml-2 h-6 w-6" />
        </span>
      )}
    </button>
  );
};

export default AuthShowcase;