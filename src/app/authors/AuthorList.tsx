import { getAllAuthors } from '@apis/author';
import { AuthorCard } from '@components/AuthorCard';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

function AuthorList() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['author'],
    queryFn: getAllAuthors,
  });

  return (
    <Grid columns={3} className={css({ padding: '20px' })} gap="20px">
      {data?.data
        .slice(0, 60)
        .map(author => (
          <AuthorCard
            key={author.id}
            author={author}
            onClick={() => router.push(`/author/${author.id}`)}
          />
        ))}
    </Grid>
  );
}

export default AuthorList;
