import { PageProps } from "@inertiajs/core";
import { usePage } from "@inertiajs/react";

// interface UserPreferences {
//   theme: 'light' | 'dark' | 'system';
//   date_format: 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY';
// }

interface CurrentUser {
  email: string;
  //   confirmed_at: string | null;
  //   preferences: UserPreferences;
}

export function useCurrentUser() {
  const { props } = usePage<PageProps & { current_user: CurrentUser }>();
  console.log(props);
  return props.currentUser;
}

export type { CurrentUser };
