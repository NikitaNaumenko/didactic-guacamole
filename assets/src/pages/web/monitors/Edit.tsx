import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Form from './Form';
import { Auth, Monitor } from '@/types';
import { useCurrentUser } from '@/hooks/use-current-user';

interface Props {
  auth: Auth;
  monitor: Monitor;
}

export default function Edit({ auth, monitor }: Props) {
  const { t } = useTranslation();
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Head title={t('monitors.edit')} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Form
            auth={auth}
            monitor={monitor}
            method="put"
            action={route('monitors.update', monitor.id)}
          />
        </div>
      </div>
    </>
  );
} 