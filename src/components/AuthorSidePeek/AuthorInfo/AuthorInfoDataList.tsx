import { AuthorAvatar } from '@components/AuthorAvatar';
import { AuthorServerModel } from '@models/author';
import { Badge, DataList } from '@radix-ui/themes';
import { capitalize } from 'lodash';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

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

  console.log({ influenceds });

  return (
    <DataList.Root className={css({ gap: '12px' })}>
      <DataList.Item align="center">
        <DataList.Label minWidth="88px">Nationality</DataList.Label>
        <DataList.Value>
          {nationality?.nationality !== undefined && (
            <Badge variant="outline" size="1" radius="full">
              {nationality.nationality}
            </Badge>
          )}
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">Era</DataList.Label>
        <DataList.Value>
          {eras.length > 0 && (
            <HStack gap="4px" flexWrap="wrap">
              {eras.map(era => (
                <Badge key={era.era} variant="outline" size="2" radius="full">
                  {era.era}
                </Badge>
              ))}
            </HStack>
          )}
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">Region</DataList.Label>
        <DataList.Value>
          {regions.length > 0 && (
            <HStack gap="4px" flexWrap="wrap">
              {regions.map(region => (
                <Badge
                  key={region.region}
                  variant="outline"
                  size="2"
                  radius="full"
                >
                  {region.region}
                </Badge>
              ))}
            </HStack>
          )}
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">Education</DataList.Label>
        <DataList.Value>
          {educations.length > 0 && (
            <HStack gap="4px" flexWrap="wrap">
              {educations.map(education => (
                <Badge
                  key={education.education}
                  variant="outline"
                  size="2"
                  radius="full"
                >
                  {education.education}
                </Badge>
              ))}
            </HStack>
          )}
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">Main interest</DataList.Label>
        <DataList.Value>
          {main_interests.length > 0 && (
            <HStack gap="4px" flexWrap="wrap">
              {main_interests.map(mainInterest => (
                <Badge
                  key={mainInterest.main_interest}
                  variant="outline"
                  size="2"
                  radius="full"
                >
                  {capitalize(mainInterest.main_interest)}
                </Badge>
              ))}
            </HStack>
          )}
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">School</DataList.Label>
        <DataList.Value>
          {main_interests.length > 0 && (
            <HStack gap="4px" flexWrap="wrap">
              {schools.length > 0 && (
                <HStack gap="4px" flexWrap="wrap">
                  {schools.map(school => (
                    <Badge
                      key={school.school}
                      variant="outline"
                      size="1"
                      radius="full"
                    >
                      {capitalize(school.school)}
                    </Badge>
                  ))}
                </HStack>
              )}
            </HStack>
          )}
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">Influenced by</DataList.Label>
        <DataList.Value>
          {influenced_bys.length > 0 && (
            <HStack gap="4px" flexWrap="wrap">
              {influenced_bys.length > 0 && (
                <HStack gap="4px" flexWrap="wrap">
                  {influenced_bys.map(influenced_by => (
                    <AuthorAvatar
                      key={influenced_by.id}
                      author={influenced_by}
                    />
                  ))}
                </HStack>
              )}
            </HStack>
          )}
        </DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">Influenced</DataList.Label>
        <DataList.Value>
          {influenceds.length > 0 && (
            <HStack gap="4px" flexWrap="wrap">
              {influenceds.length > 0 && (
                <HStack gap="4px" flexWrap="wrap">
                  {influenceds.map(influenced => (
                    <AuthorAvatar key={influenced.id} author={influenced} />
                  ))}
                </HStack>
              )}
            </HStack>
          )}
        </DataList.Value>
      </DataList.Item>
    </DataList.Root>
  );
}
