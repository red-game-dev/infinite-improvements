import { ProfilePage } from '@/components/pages/ProfilePage';
import { getTranslation } from '@/i18n';
import type { Metadata } from 'next';

const siteName = getTranslation('seo.siteName');
const defaultTitle = getTranslation('seo.defaultTitle');
const defaultDescription = getTranslation('seo.defaultDescription');

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
}

export default function Home() {
  return <ProfilePage />;
}