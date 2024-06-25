import { getAllAuthors } from '@apis/author';
import { AuthorCard } from '@components/AuthorCard';
import { useQuery } from '@tanstack/react-query';
import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

function AuthorList() {
  const { data } = useQuery({
    queryKey: ['author'],
    queryFn: getAllAuthors,
  });

  return (
    <Grid columns={3} className={css({ py: '20px' })} gap="20px">
      {data?.data
        .slice(0, 60)
        .map(author => <AuthorCard key={author.id} author={author} />)}
    </Grid>
  );
}

export default AuthorList;
