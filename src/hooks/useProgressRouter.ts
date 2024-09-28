import { useRouter as useBaseRouter } from 'next/navigation';
import NProgress from 'nprogress';

export default function useRouter() {
  const router = useBaseRouter();

  const { push } = router;

  router.push = async (...args: Parameters<typeof push>) => {
    NProgress.start();
    push(...args);
    NProgress.done();
  };

  return router;
}
