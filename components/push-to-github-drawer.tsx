import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DownloadCloudIcon,
  DownloadIcon,
  GithubIcon,
  PlusIcon,
} from 'lucide-react';
import { useState } from 'react';

// ... (previous mock API functions remain the same)

export default function Component({ type }: { type?: string }) {
  const [submissions, setSubmissions] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(Boolean(type));
  const [drawerType, setDrawerType] = useState(type);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const itemsPerPage = 10;

  // ... (previous handler functions remain the same)

  const openDrawer = (type, submission = null) => {
    setDrawerType(type);
    setSelectedSubmission(submission);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setDrawerType(null);
    setSelectedSubmission(null);
  };

  const DrawerContent = () => {
    if (drawerType === 'push') {
      return (
        <div className='space-y-4'>
          <SheetHeader>
            <SheetTitle>Push to GitHub</SheetTitle>
            <SheetDescription>
              Select a repository or create a new one to push your{' '}
              {selectedSubmission ? 'solution' : 'solutions'} to GitHub.
            </SheetDescription>
          </SheetHeader>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Select a repository' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='repo1'>LeetCode-Solutions</SelectItem>
              <SelectItem value='repo2'>Coding-Practice</SelectItem>
              <SelectItem value='repo3'>Algorithm-Challenges</SelectItem>
            </SelectContent>
          </Select>
          <div className='flex items-center space-x-2'>
            <div className='h-px flex-1 bg-gray-200'></div>
            <span className='text-xs text-gray-400'>or</span>
            <div className='h-px flex-1 bg-gray-200'></div>
          </div>
          <Input placeholder='New repository name' />
          <Button className='w-full'>
            <PlusIcon className='mr-2 h-4 w-4' />
            Create New Repository and Push
          </Button>
        </div>
      );
    } else if (drawerType === 'download') {
      return (
        <div className='space-y-4'>
          <SheetHeader>
            <SheetTitle>Download Options</SheetTitle>
            <SheetDescription>
              Choose how you want to download your{' '}
              {selectedSubmission ? 'solution' : 'solutions'}.
            </SheetDescription>
          </SheetHeader>
          <Button className='w-full'>Download as ZIP</Button>
          <Button className='w-full'>Download as Individual Files</Button>
        </div>
      );
    }
    return null;
  };

  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent>
        <DrawerContent />
      </SheetContent>
    </Sheet>
  );
}
