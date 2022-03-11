import { ArchiveIcon, BarChartIcon, ClipboardIcon, DashboardIcon, FileTextIcon, LayersIcon } from "@modulz/radix-icons";

const links = [
  { label: 'Dashboard', icon: DashboardIcon, href: '/dashboard' },
  { label: 'Projects', icon: LayersIcon, href: '/projects' },
  { label: 'Forms', icon: ClipboardIcon, href: '/forms' },
  { label: 'Analytics', icon: BarChartIcon, href: '/analytics' },
  { label: 'Backups', icon: ArchiveIcon, href: '/backups' },
  { label: 'Docs', icon: FileTextIcon, href: '/docs' },
];

export default links;