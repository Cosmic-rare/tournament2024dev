import { useSession, signOut, getSession } from "next-auth/react"
import React from 'react';
import { Button } from 'antd';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
    },
  };
}

interface YourComponentProps {
  data1: any[];
  data2: any[];
  data3: any[];
}

const Escalation: React.FC<YourComponentProps> = () => {
  const { data: session } = useSession()

  if (session?.user.role === "ADMIN") {
    return (
      <div>
        Signed in as {session?.user?.name} <br />
        <p style={{fontSize: 8}}>{JSON.stringify(session)}</p>
        <button onClick={() => signOut()}>Sign out</button>

        <Button>昇格するぞ♡</Button>
      </div>
    );
  }
  return (
    <>
      権限足りんよ
    </>
  )
};

export default Escalation;
