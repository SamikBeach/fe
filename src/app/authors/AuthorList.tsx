import { searchAuthors } from '@apis/author';
import {
  selectedEducationIdAtom,
  selectedEraIdAtom,
  selectedMainInterestIdAtom,
  selectedNationalityIdAtom,
  selectedRegionIdAtom,
  selectedSchoolIdAtom,
} from '@atoms/filter';
import { AuthorCard } from '@components/AuthorCard';
import { AuthorFilterBox } from '@components/AuthorFilterBox';
import { FILTER_BOX_HEIGHT, HEADER_HEIGHT } from '@constants/common';
import { Spinner } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

function AuthorList() {
  const selectedNationalityId = useAtomValue(selectedNationalityIdAtom);
  const selectedEraId = useAtomValue(selectedEraIdAtom);
  const selectedRegionId = useAtomValue(selectedRegionIdAtom);
  const selectedMainInterestId = useAtomValue(selectedMainInterestIdAtom);
  const selectedSchoolId = useAtomValue(selectedSchoolIdAtom);
  const selectedEducationId = useAtomValue(selectedEducationIdAtom);

  const { data: authors = [], isLoading } = useQuery({
    queryKey: [
      'author',
      selectedNationalityId,
      selectedEraId,
      selectedRegionId,
      selectedMainInterestId,
      selectedSchoolId,
      selectedEducationId,
    ],
    queryFn: () =>
      searchAuthors({
        nationalityId: selectedNationalityId,
        eraId: selectedEraId,
        regionId: selectedRegionId,
        mainInterestId: selectedMainInterestId,
        schoolId: selectedSchoolId,
        educationId: selectedEducationId,
        take: 450,
      }),
    select: response => response.data.data,
  });

  return (
    <>
      <AuthorFilterBox />
      {isLoading ? (
        <VStack height="calc(100vh - 124px)" justify="center">
          <Spinner size="3" />
        </VStack>
      ) : (
        <HStack paddingBottom="30px" justify="center">
          <div className={css({ width: '1460px', px: '20px' })}>
            <HStack flexWrap="wrap" justifyContent="start" gap="20px">
              {authors.slice(0, 100).map(author => (
                <AuthorCard key={author.id} author={author} />
              ))}
            </HStack>
          </div>
        </HStack>
      )}
    </>
  );
}

export default AuthorList;
