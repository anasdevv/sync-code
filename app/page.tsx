'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  GithubIcon,
  DownloadIcon,
  SearchIcon,
  DownloadCloudIcon,
  CodeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import PushToGithub from '@/components/push-to-github-drawer';
import { useSession } from 'next-auth/react';
// Mock API functions (replace these with actual API calls)
const fetchLeetCodeStats = async (username: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    ranking: 10000,
    totalSolved: 150,
    easySolved: 50,
    mediumSolved: 75,
    hardSolved: 25,
    solvedOverTime: [
      { date: '2023-01-01', solved: 50 },
      { date: '2023-02-01', solved: 75 },
      { date: '2023-03-01', solved: 100 },
      { date: '2023-04-01', solved: 125 },
      { date: '2023-05-01', solved: 150 },
    ],
  };
};

const fetchLeetCodeSubmissions = async (username: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Generate more mock submissions for pagination demonstration
  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    title: `Problem ${i + 1}`,
    difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
    lastSubmitted: new Date(Date.now() - Math.random() * 10000000000)
      .toISOString()
      .split('T')[0],
  }));
};

export default function Component() {
  const session = useSession();
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = async () => {
    setLoading(true);
    try {
      const userStats = await fetchLeetCodeStats(username);
      const userSubmissions = await fetchLeetCodeSubmissions(username);
      setStats(userStats);
      setSubmissions(userSubmissions);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleDownload = (submissionId: string) => {
    console.log(`Downloading submission ${submissionId}`);
  };

  const handlePushToGitHub = (submissionId: string) => {
    console.log(`Pushing submission ${submissionId} to GitHub`);
  };

  const handleDownloadAll = () => {
    console.log('Downloading all solutions');
  };

  const handlePushAllToGitHub = () => {
    console.log('Pushing all solutions to GitHub');
  };

  const totalPages = Math.ceil(submissions.length / itemsPerPage);
  const paginatedSubmissions = submissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const UserProfile = ({ user }) => (
    <div className='flex items-center  space-x-4 justify-start  w-full md:w-auto md:mx-0 my-4 md:my-1 '>
      <Avatar>
        <AvatarImage src={user?.image} alt={user?.name} />
        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className='text-sm font-medium text-gray-700'>{user.name}</p>
        <p className='text-xs text-gray-500'>@{user?.email}</p>
      </div>
    </div>
  );
  console.log('sessions ', session);
  return (
    <div className=' mx-auto p-4 space-y-4 bg-gray-100 min-h-screen'>
      <PushToGithub type='push' />
      <Card className='bg-white'>
        <CardHeader>
          <div className='flex justify-between items-center flex-col md:flex-row md:w-full'>
            <div>
              <CardTitle className='text-gray-800'>
                LeetCode-GitHub Dashboard
              </CardTitle>
              <CardDescription className='text-gray-600'>
                Enter your LeetCode username to view stats and submissions
              </CardDescription>
            </div>
            {session?.data && <UserProfile user={session?.data?.user} />}
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex space-x-2'>
            <Input
              placeholder='LeetCode Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='bg-gray-50 text-gray-800'
            />
            <Button
              onClick={handleSearch}
              disabled={loading}
              className='bg-gray-700 hover:bg-gray-600 text-white'
            >
              {loading ? 'Loading...' : 'Search'}
              <SearchIcon className='ml-2 h-4 w-4' />
            </Button>
          </div>
        </CardContent>
      </Card>

      {!stats && !submissions.length ? (
        <Card className='bg-white h-screen'>
          <CardContent className='flex flex-col items-center justify-center py-12'>
            <div className='w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-6'>
              <CodeIcon className='w-16 h-16 text-gray-400' />
            </div>
            <h2 className='text-2xl font-semibold text-gray-700 mb-2'>
              Welcome to LeetCode-GitHub Dashboard
            </h2>
            <p className='text-gray-500 text-center max-w-md mb-6'>
              Enter your LeetCode username above to view your stats,
              submissions, and manage your solutions.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl'>
              <div className='bg-gray-50 p-4 rounded-lg text-center'>
                <h3 className='font-semibold text-gray-700 mb-2'>View Stats</h3>
                <p className='text-gray-500 text-sm'>
                  See your LeetCode ranking and solved problem counts
                </p>
              </div>
              <div className='bg-gray-50 p-4 rounded-lg text-center'>
                <h3 className='font-semibold text-gray-700 mb-2'>
                  Manage Submissions
                </h3>
                <p className='text-gray-500 text-sm'>
                  Download or push your solutions to GitHub
                </p>
              </div>
              <div className='bg-gray-50 p-4 rounded-lg text-center'>
                <h3 className='font-semibold text-gray-700 mb-2'>
                  Track Progress
                </h3>
                <p className='text-gray-500 text-sm'>
                  Visualize your problem-solving progress over time
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {stats && (
            <>
              <Card className='bg-white'>
                <CardHeader>
                  <CardTitle className='text-gray-800'>
                    LeetCode Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-2 md:grid-cols-5 gap-4 text-center'>
                    <div>
                      <p className='text-2xl font-bold text-gray-800'>
                        {stats.ranking}
                      </p>
                      <p className='text-gray-600'>Ranking</p>
                    </div>
                    <div>
                      <p className='text-2xl font-bold text-gray-800'>
                        {stats.totalSolved}
                      </p>
                      <p className='text-gray-600'>Total Solved</p>
                    </div>
                    <div>
                      <p className='text-2xl font-bold text-gray-800'>
                        {stats.easySolved}
                      </p>
                      <p className='text-gray-600'>Easy</p>
                    </div>
                    <div>
                      <p className='text-2xl font-bold text-gray-800'>
                        {stats.mediumSolved}
                      </p>
                      <p className='text-gray-600'>Medium</p>
                    </div>
                    <div>
                      <p className='text-2xl font-bold text-gray-800'>
                        {stats.hardSolved}
                      </p>
                      <p className='text-gray-600'>Hard</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='bg-white'>
                <CardHeader>
                  <CardTitle className='text-gray-800'>
                    Solved Problems Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='h-[300px]'>
                    <ResponsiveContainer width='100%' height='100%'>
                      <LineChart data={stats.solvedOverTime}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#e5e7eb' />
                        <XAxis dataKey='date' stroke='#4b5563' />
                        <YAxis stroke='#4b5563' />
                        <Tooltip />
                        <Line
                          type='monotone'
                          dataKey='solved'
                          stroke='#4b5563'
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {submissions.length > 0 && (
            <Card className='bg-white'>
              <CardHeader>
                <CardTitle className='text-gray-800'>Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='flex justify-end space-x-2 mb-4'>
                  <Button
                    onClick={handleDownloadAll}
                    className='bg-gray-700 hover:bg-gray-600 text-white'
                  >
                    Download All
                    <DownloadCloudIcon className='ml-2 h-4 w-4' />
                  </Button>
                  <Button
                    onClick={handlePushAllToGitHub}
                    className='bg-gray-700 hover:bg-gray-600 text-white'
                  >
                    Push All to GitHub
                    <GithubIcon className='ml-2 h-4 w-4' />
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='text-gray-700'>Title</TableHead>
                      <TableHead className='text-gray-700'>
                        Difficulty
                      </TableHead>
                      <TableHead className='text-gray-700'>
                        Last Submitted
                      </TableHead>
                      <TableHead className='text-gray-700'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className='text-gray-800'>
                          {submission.title}
                        </TableCell>
                        <TableCell className='text-gray-800'>
                          {submission.difficulty}
                        </TableCell>
                        <TableCell className='text-gray-800'>
                          {submission.lastSubmitted}
                        </TableCell>
                        <TableCell>
                          <div className='flex space-x-2'>
                            <Button
                              size='sm'
                              variant='outline'
                              onClick={() => handleDownload(submission.id)}
                              className='text-gray-700 border-gray-300'
                            >
                              <DownloadIcon className='h-4 w-4' />
                            </Button>
                            <Button
                              size='sm'
                              variant='outline'
                              onClick={() => handlePushToGitHub(submission.id)}
                              className='text-gray-700 border-gray-300'
                            >
                              <GithubIcon className='h-4 w-4' />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className='flex items-center justify-between space-x-2 py-4'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeftIcon className='h-4 w-4' />
                    Previous
                  </Button>
                  <div className='flex-1 text-center text-sm text-gray-700'>
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      setCurrentPage((page) => Math.min(totalPages, page + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRightIcon className='h-4 w-4' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
