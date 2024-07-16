import { AuthorAvatar } from '@components/AuthorAvatar';
import { AuthorServerModel } from '@models/author';
import { Avatar, ScrollArea, Table, Text, Tooltip } from '@radix-ui/themes';
import { getBornDateText, getDiedDateText } from '@utils/author';
import { capitalize } from 'lodash';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  authors: AuthorServerModel[];
}

const tableColumnHeaderCellStyle = css({
  backgroundColor: 'gray.50',
  zIndex: 2,
  borderTopLeftRadius: 10,
  position: 'fixed',
});

export default function AuthorTable({ authors }: Props) {
  const router = useRouter();
  return (
    <Table.Root
      variant="surface"
      mx="20px"
      mb="20px"
      className={css({
        height: 'calc(100vh - 64px - 76px - 20px)',
      })}
    >
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell minWidth="240px">Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell minWidth="136px">
            Born date
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell minWidth="136px">
            Died date
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell minWidth="136px">
            Nationality
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Eras</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Regions</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Educations</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Main interests</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Schools</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell minWidth="200px" maxWidth="400px">
            Influenced
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell minWidth="200px" maxWidth="400px">
            Influenced by
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {authors.map(author => (
          <Table.Row
            key={author.id}
            className={css({
              cursor: 'pointer',
              _hover: {
                backgroundColor: 'gray.50',
              },
              height: '60px',
            })}
            align="center"
            onClick={() => router.push(`/author/${author.id}`)}
          >
            <Table.RowHeaderCell minWidth="240px">
              <HStack>
                <Avatar
                  size="2"
                  radius="full"
                  src={author.image_url ?? undefined}
                  fallback={author.name[0]}
                />
                <VStack alignItems="start" gap="0px">
                  <Text weight="bold">{author.name}</Text>
                  <Text className={css({ fontSize: '13px' })}>
                    {author.name_in_kor}
                  </Text>
                </VStack>
              </HStack>
            </Table.RowHeaderCell>
            <Table.Cell>
              {getBornDateText({
                bornDate: author.born_date,
                bornDateIsBc: author.born_date_is_bc === 1,
              })}
            </Table.Cell>
            <Table.Cell>
              {getDiedDateText({
                diedDate: author.died_date,
                diedDateIsBc: author.died_date_is_bc === 1,
              })}
            </Table.Cell>
            <Table.Cell>{author.nationality?.nationality}</Table.Cell>
            <Table.Cell>
              {author.eras?.map(era => era.era).join(', ')}
            </Table.Cell>
            <Table.Cell>
              {author.regions?.map(region => region.region).join(', ')}
            </Table.Cell>
            <Table.Cell maxWidth="200px">
              <Tooltip
                content={author.educations
                  ?.map(education => capitalize(education.education))
                  .join(', ')}
              >
                <div
                  className={css({
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  })}
                >
                  <Text>
                    {author.educations
                      ?.map(education => education.education)
                      .join(', ')}
                  </Text>
                </div>
              </Tooltip>
            </Table.Cell>
            <Table.Cell maxWidth="200px">
              <Tooltip
                content={author.main_interests
                  ?.map(mainInterest => capitalize(mainInterest.main_interest))
                  .join(', ')}
              >
                <div
                  className={css({
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  })}
                >
                  <Text>
                    {author.main_interests
                      ?.map(mainInterest =>
                        capitalize(mainInterest.main_interest)
                      )
                      .join(', ')}
                  </Text>
                </div>
              </Tooltip>
            </Table.Cell>
            <Table.Cell maxWidth="200px">
              <Tooltip
                content={author.schools
                  ?.map(school => capitalize(school.school))
                  .join(', ')}
              >
                <div
                  className={css({
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  })}
                >
                  <Text>
                    {author.schools
                      ?.map(school => capitalize(school.school))
                      .join(', ')}
                  </Text>
                </div>
              </Tooltip>
            </Table.Cell>
            <Table.Cell>
              <HStack gap="4px">
                {author.influenceds?.map(influenced => (
                  <AuthorAvatar key={influenced.id} author={influenced} />
                ))}
              </HStack>
            </Table.Cell>
            <Table.Cell>
              <HStack gap="4px">
                {author.influenced_bys?.map(influencedBy => (
                  <AuthorAvatar key={influencedBy.id} author={influencedBy} />
                ))}
              </HStack>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
