import { AuthorHoverCard } from '@components/AuthorHoverCard';
import { AuthorServerModel } from '@models/author';
import { DataList, Text } from '@radix-ui/themes';
import { capitalize } from 'lodash';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

interface Props {
  author: AuthorServerModel;
}

export default function AuthorInfoDataList({ author }: Props) {
  const {
    nationality,
    main_interests = [],
    educations = [],
    eras = [],
    regions = [],
    schools = [],
    influenceds = [],
    influenced_bys = [],
  } = author;

  return (
    <DataList.Root className={css({ gap: '12px' })}>
      {nationality?.nationality !== undefined && (
        <DataList.Item align="center">
          <DataList.Label minWidth="88px">Nationality</DataList.Label>
          <DataList.Value>{nationality.nationality}</DataList.Value>
        </DataList.Item>
      )}
      {eras.length > 0 && (
        <DataList.Item>
          <DataList.Label minWidth="88px">Era</DataList.Label>
          <DataList.Value>{eras.map(era => era.era).join(', ')}</DataList.Value>
        </DataList.Item>
      )}
      {regions.length > 0 && (
        <DataList.Item>
          <DataList.Label minWidth="88px">Region</DataList.Label>
          <DataList.Value>
            {regions.map(region => region.region).join(', ')}
          </DataList.Value>
        </DataList.Item>
      )}
      {educations.length > 0 && (
        <DataList.Item>
          <DataList.Label minWidth="88px">Education</DataList.Label>
          <DataList.Value>
            {educations.map(education => education.education).join(', ')}
          </DataList.Value>
        </DataList.Item>
      )}
      {main_interests.length > 0 && (
        <DataList.Item>
          <DataList.Label minWidth="88px">Main interest</DataList.Label>
          <DataList.Value>
            {main_interests
              .map(mainInterest => capitalize(mainInterest.main_interest))
              .join(', ')}
          </DataList.Value>
        </DataList.Item>
      )}
      {schools.length > 0 && (
        <DataList.Item>
          <DataList.Label minWidth="88px">School</DataList.Label>
          <DataList.Value>
            {schools.map(school => capitalize(school.school)).join(', ')}
          </DataList.Value>
        </DataList.Item>
      )}
      {influenced_bys.length > 0 && (
        <DataList.Item>
          <DataList.Label minWidth="88px">Influenced by</DataList.Label>
          <DataList.Value>
            <VStack gap="0px" alignItems="start">
              {influenced_bys.map(influenced_by => (
                <>
                  <AuthorHoverCard.Root>
                    <AuthorHoverCard.Trigger>
                      <Link
                        key={influenced_by.id}
                        href={`/author/${influenced_by.id}`}
                      >
                        <Text
                          className={css({
                            cursor: 'pointer',
                            _hover: { textDecoration: 'underline' },
                          })}
                        >
                          {influenced_by.name}
                        </Text>
                      </Link>
                    </AuthorHoverCard.Trigger>
                    <AuthorHoverCard.Content
                      author={influenced_by}
                      side="right"
                    />
                  </AuthorHoverCard.Root>
                </>
              ))}
            </VStack>
          </DataList.Value>
        </DataList.Item>
      )}
      <DataList.Item>
        <DataList.Label minWidth="88px">Influenced</DataList.Label>
        <DataList.Value>
          <VStack gap="0px" alignItems="start">
            {influenceds.map(influenced => (
              <>
                <AuthorHoverCard.Root>
                  <AuthorHoverCard.Trigger>
                    <Link key={influenced.id} href={`/author/${influenced.id}`}>
                      <Text
                        className={css({
                          cursor: 'pointer',
                          _hover: { textDecoration: 'underline' },
                        })}
                      >
                        {influenced.name}
                      </Text>
                    </Link>
                  </AuthorHoverCard.Trigger>
                  <AuthorHoverCard.Content author={influenced} side="right" />
                </AuthorHoverCard.Root>
              </>
            ))}
          </VStack>
        </DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
}
