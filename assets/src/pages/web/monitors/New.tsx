import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Form from './Form';
import { Auth } from '@/types';
import { useCurrentUser } from '@/hooks/use-current-user';

interface Props {
  auth: Auth;
}

export default function New({ auth }: Props) {
  const { t } = useTranslation();
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Head title={t('monitors.create')} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Form
            auth={auth}
            method="post"
            action={route('monitors.store')}
          />
        </div>
      </div>
    </>
  );
} 