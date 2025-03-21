import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Auth, Monitor } from '@/types';
import { useCurrentUser } from '@/hooks/use-current-user';

interface Props {
  auth: Auth;
  monitor: Monitor;
}

export default function Show({ auth, monitor }: Props) {
  const { t } = useTranslation();
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Head title={t('monitors.show')} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{monitor.name}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  monitor.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {monitor.is_active ? t('monitors.active') : t('monitors.inactive')}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">{t('monitors.description')}</h3>
                  <p className="mt-1 text-sm text-gray-900">{monitor.description || t('monitors.no_description')}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">{t('monitors.url')}</h3>
                  <p className="mt-1 text-sm text-gray-900">{monitor.url}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">{t('monitors.method')}</h3>
                  <p className="mt-1 text-sm text-gray-900">{monitor.method}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">{t('monitors.interval')}</h3>
                  <p className="mt-1 text-sm text-gray-900">{monitor.interval_seconds}s</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">{t('monitors.timeout')}</h3>
                  <p className="mt-1 text-sm text-gray-900">{monitor.timeout_seconds}s</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">{t('monitors.expected_status')}</h3>
                  <p className="mt-1 text-sm text-gray-900">{monitor.expected_status_code}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">{t('monitors.retry_count')}</h3>
                  <p className="mt-1 text-sm text-gray-900">{monitor.retry_count}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">{t('monitors.retry_interval')}</h3>
                  <p className="mt-1 text-sm text-gray-900">{monitor.retry_interval_seconds}s</p>
                </div>

                {monitor.body && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">{t('monitors.body')}</h3>
                    <pre className="mt-1 text-sm text-gray-900 bg-gray-50 p-4 rounded-md overflow-x-auto">
                      {monitor.body}
                    </pre>
                  </div>
                )}

                {Object.keys(monitor.headers).length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">{t('monitors.headers')}</h3>
                    <div className="mt-1 text-sm text-gray-900 bg-gray-50 p-4 rounded-md">
                      {Object.entries(monitor.headers).map(([key, value]) => (
                        <div key={key} className="mb-1">
                          <span className="font-medium">{key}:</span> {value}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <Link href={route('monitors.edit', monitor.id)}>
                  <Button variant="outline">{t('monitors.edit')}</Button>
                </Link>
                <Link href={route('monitors.index')}>
                  <Button variant="outline">{t('monitors.back')}</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
} 