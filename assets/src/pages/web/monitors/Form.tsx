import { useForm } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Auth, Monitor, MonitorFormData } from '@/types';
import { useCurrentUser } from '@/hooks/use-current-user';
import { route } from '@/lib/route';

interface Props {
  auth: Auth;
  monitor?: Monitor;
  method?: 'post' | 'put';
  action: string;
}

export default function Form({ auth, monitor, method = 'post', action }: Props) {
  const { t } = useTranslation();
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return null;
  }

  const { data, setData, post, put, processing, errors, reset } = useForm<MonitorFormData>({
    name: monitor?.name || '',
    description: monitor?.description || '',
    url: monitor?.url || '',
    method: monitor?.method || 'GET',
    interval_seconds: monitor?.interval_seconds || 300,
    timeout_seconds: monitor?.timeout_seconds || 10,
    expected_status_code: monitor?.expected_status_code || 200,
    headers: monitor?.headers || {},
    body: monitor?.body || '',
    is_active: monitor?.is_active ?? true,
    retry_count: monitor?.retry_count || 3,
    retry_interval_seconds: monitor?.retry_interval_seconds || 60,
  });

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (method === 'post') {
      post(action);
    } else {
      put(action);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setData(name as keyof MonitorFormData, (e.target as HTMLInputElement).checked);
    } else if (type === 'number') {
      setData(name as keyof MonitorFormData, parseInt(value));
    } else {
      setData(name as keyof MonitorFormData, value || '');
    }
  };

  return (
    <>
      <Head title={monitor ? t('monitors.edit') : t('monitors.create')} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>{monitor ? t('monitors.edit') : t('monitors.create')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('monitors.name')}</Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      value={data.name}
                      autoComplete="name"
                      isFocused={true}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="url">{t('monitors.url')}</Label>
                    <Input
                      id="url"
                      type="url"
                      name="url"
                      value={data.url}
                      autoComplete="url"
                      onChange={handleChange}
                      required
                    />
                    {errors.url && <p className="text-sm text-red-500">{errors.url}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">{t('monitors.description')}</Label>
                    <Input
                      id="description"
                      type="text"
                      name="description"
                      value={data.description}
                      onChange={handleChange}
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="method">{t('monitors.method')}</Label>
                    <select
                      id="method"
                      name="method"
                      value={data.method}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      onChange={handleChange}
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                      <option value="HEAD">HEAD</option>
                      <option value="OPTIONS">OPTIONS</option>
                    </select>
                    {errors.method && <p className="text-sm text-red-500">{errors.method}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interval_seconds">{t('monitors.interval')}</Label>
                    <Input
                      id="interval_seconds"
                      type="number"
                      name="interval_seconds"
                      value={data.interval_seconds}
                      onChange={handleChange}
                      required
                    />
                    {errors.interval_seconds && <p className="text-sm text-red-500">{errors.interval_seconds}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeout_seconds">{t('monitors.timeout')}</Label>
                    <Input
                      id="timeout_seconds"
                      type="number"
                      name="timeout_seconds"
                      value={data.timeout_seconds}
                      onChange={handleChange}
                      required
                    />
                    {errors.timeout_seconds && <p className="text-sm text-red-500">{errors.timeout_seconds}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expected_status_code">{t('monitors.expected_status')}</Label>
                    <select
                      id="expected_status_code"
                      name="expected_status_code"
                      value={data.expected_status_code}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      onChange={handleChange}
                    >
                      <option value="200">200 OK</option>
                      <option value="201">201 Created</option>
                      <option value="202">202 Accepted</option>
                      <option value="204">204 No Content</option>
                      <option value="301">301 Moved Permanently</option>
                      <option value="302">302 Found</option>
                      <option value="307">307 Temporary Redirect</option>
                      <option value="308">308 Permanent Redirect</option>
                      <option value="400">400 Bad Request</option>
                      <option value="401">401 Unauthorized</option>
                      <option value="403">403 Forbidden</option>
                      <option value="404">404 Not Found</option>
                      <option value="500">500 Internal Server Error</option>
                      <option value="502">502 Bad Gateway</option>
                      <option value="503">503 Service Unavailable</option>
                      <option value="504">504 Gateway Timeout</option>
                    </select>
                    {errors.expected_status_code && <p className="text-sm text-red-500">{errors.expected_status_code}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="body">{t('monitors.body')}</Label>
                    <textarea
                      id="body"
                      name="body"
                      value={data.body}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      rows={3}
                      onChange={handleChange}
                    />
                    {errors.body && <p className="text-sm text-red-500">{errors.body}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="retry_count">{t('monitors.retry_count')}</Label>
                    <Input
                      id="retry_count"
                      type="number"
                      name="retry_count"
                      value={data.retry_count}
                      onChange={handleChange}
                      required
                    />
                    {errors.retry_count && <p className="text-sm text-red-500">{errors.retry_count}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="retry_interval_seconds">{t('monitors.retry_interval')}</Label>
                    <Input
                      id="retry_interval_seconds"
                      type="number"
                      name="retry_interval_seconds"
                      value={data.retry_interval_seconds}
                      onChange={handleChange}
                      required
                    />
                    {errors.retry_interval_seconds && <p className="text-sm text-red-500">{errors.retry_interval_seconds}</p>}
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      id="is_active"
                      type="checkbox"
                      name="is_active"
                      checked={data.is_active}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      onChange={handleChange}
                    />
                    <Label htmlFor="is_active">{t('monitors.status')}</Label>
                    {errors.is_active && <p className="text-sm text-red-500">{errors.is_active}</p>}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={processing}>
                    {monitor ? t('monitors.save') : t('monitors.create')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
} 