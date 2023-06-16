import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";

import { Avatar, QuoteComponent, Streak, Stats, LoginComponent } from '~/components';

const Home: NextPage = () => {
  const { data: sessionData, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>STOP APP</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {sessionData ? (
        <main className="flex min-h-screen flex-col items-center justify-start bg-neutral p-[20px]">
          <Avatar />
          <Streak />
          <Stats />
          <QuoteComponent />
        </main>
      ) : (
        <main className="flex min-h-screen flex-col items-center justify-between bg-neutral p-[20px]">
          <LoginComponent />
        </main>
      )}
    </>
  );
};

export default Home;
