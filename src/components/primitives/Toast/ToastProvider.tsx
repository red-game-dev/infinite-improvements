'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import { useToastStore } from '@/stores/toast/useToastStore';
import { usePortal } from '@/hooks/usePortal';

export function ToastProvider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <ToastPortal />;
}

function ToastPortal() {
  const toasts = useToastStore((state) => state?.toasts ?? []);
  const hideToast = useToastStore((state) => state?.hideToast ?? (() => {}));
  const portalContainer = usePortal('toast-portal');

  if (!portalContainer) return null;

  return createPortal(
    <div className="fixed top-4 right-4 left-4 sm:left-auto z-toast flex flex-col gap-2 max-w-md mx-auto sm:mx-0 pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            toast={toast}
            onDismiss={hideToast}
          />
        </div>
      ))}
    </div>,
    portalContainer
  );
}