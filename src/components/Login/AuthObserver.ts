import { useEffect } from 'react';
import { useStore } from '../../store/AuthStore';

function AuthObserver() {
  const authStore = useStore();

  useEffect(() => {
    const authObserver = (e: StorageEvent): void => {
      if (e.key === 'AUTH_USER_ID') {
        const userId = localStorage.getItem(e.key) || 0;
        authStore?.authMe(+userId);
      }
    };
    window.addEventListener('storage', authObserver, false);

    return () => {
      window.removeEventListener('storage', authObserver, false);
    };
  }, []);
  return null;
}
export default AuthObserver;
