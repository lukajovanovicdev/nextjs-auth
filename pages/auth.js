import { getSession } from 'next-auth/client';
import AuthForm from '../components/auth/auth-form';

function AuthPage() {
  // const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();
  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (session) {
  //       router.replace('/');
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, [router]);
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  return <AuthForm />;
}

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default AuthPage;
