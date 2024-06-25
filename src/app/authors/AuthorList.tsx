import { searchAuthors } from '@apis/author';
import {
  selectedEraIdAtom,
  selectedNationalityIdAtom,
  selectedRegionIdAtom,
} from '@atoms/filter';
import { AuthorCard } from '@components/AuthorCard';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { Grid } from 'styled-system/jsx';

function AuthorList() {
  const router = useRouter();

  const selectedNationalityId = useAtomValue(selectedNationalityIdAtom);
  const selectedEraId = useAtomValue(selectedEraIdAtom);
  const selectedRegionId = useAtomValue(selectedRegionIdAtom);

  const { data: authors = [] } = useQuery({
    queryKey: [
      'author',
      selectedNationalityId,
      selectedEraId,
      selectedRegionId,
    ],
    queryFn: () =>
      searchAuthors({
        nationalityId: selectedNationalityId,
        eraId: selectedEraId,
        regionId: selectedRegionId,
      }),
    select: response => response.data,
  });

  return (
    <Grid columns={3} className={css({ padding: '20px' })} gap="20px">
      {authors.slice(0, 60).map(author => (
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
