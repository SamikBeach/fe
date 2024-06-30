import { AuthorAvatar } from '@components/AuthorAvatar';
import { AuthorServerModel } from '@models/author';
import { Avatar, Text } from '@radix-ui/themes';
import { getBornAndDiedDateText } from '@utils/author';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  author: AuthorServerModel;
}

function AuthorInfo({ author }: Props) {
  const {
    name,
    image_url,
    born_date,
    born_date_is_bc,
    died_date,
    died_date_is_bc,
    nationality,
    educations = [],
    regions = [],
    eras = [],
    schools = [],
    influenceds = [],
    influenced_bys = [],
    main_interests = [],
  } = author;

  return (
    <HStack gap="16px">
      <Avatar
        src={image_url ?? undefined}
        fallback={name ?? ''}
        size="9"
        radius="full"
      />
      <VStack alignItems="start" gap="0px">
        <Text
          weight="bold"
          className={css({ fontWeight: 'bold', fontSize: '20px' })}
        >
          {name}
        </Text>
        <HStack>
          <Text size="2" color="gray">
            {getBornAndDiedDateText({
              bornDate: born_date,
              diedDate: died_date,
              bornDateIsBc: born_date_is_bc === 1,
              diedDateIsBc: died_date_is_bc === 1,
            })}
          </Text>
        </HStack>
        <Text className={css({ fontSize: '14px' })}>Author 설명</Text>
        <HStack gap="20px">
          <VStack alignItems="start" gap="0">
            <Text size="1" color="gray">
              {nationality?.nationality}
            </Text>
            <Text size="1">
              {main_interests
                ?.map(mainInterest => mainInterest.main_interest)
                .join(', ')}
            </Text>
            <Text size="1">
              {educations.map(education => education.education).join(', ')}
            </Text>
            <Text size="1">{eras.map(era => era.era).join(', ')}</Text>
            <Text size="1">
              {regions.map(region => region.region).join(', ')}
            </Text>
            <Text size="1">
              {schools.map(school => school.school).join(', ')}
            </Text>
            <Text>Influenced By</Text>
            <HStack gap="2px">
              {influenced_bys.map(influencedBy => (
                <AuthorAvatar size="1" author={influencedBy} />
              ))}
            </HStack>
          </VStack>
          <VStack alignItems="start" gap="0">
            <Text>Influenced To</Text>
            <HStack gap="2px">
              {influenceds.map(influenced => (
                <AuthorAvatar size="1" author={influenced} />
              ))}
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
}

export default AuthorInfo;
