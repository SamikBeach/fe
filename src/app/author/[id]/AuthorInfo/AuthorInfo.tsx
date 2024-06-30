import { AuthorServerModel } from '@models/author';
import { HeartIcon } from '@radix-ui/react-icons';
import { Avatar, Text } from '@radix-ui/themes';
import { getIsValidDateString } from '@utils/author';
import { format } from 'date-fns';
import { isNil } from 'lodash';
import { HStack, VStack } from 'styled-system/jsx';
import InfluencedList from './InfluencedList';
import InfluencedByList from './InfluencedByList';

interface Props {
  author: AuthorServerModel;
}

export default function AuthorInfo({ author }: Props) {
  const {
    name,
    name_in_kor,
    image_url,
    born_date,
    died_date,
    born_date_is_bc,
    died_date_is_bc,
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
    <HStack justify="space-between" alignItems="start" width="100%">
      <HStack alignItems="start" gap="40px">
        <Avatar
          radius="full"
          src={image_url ?? undefined}
          fallback={name}
          size="9"
        />
        <VStack alignItems="start" gap="0">
          <Text size="6" weight="bold">
            {name}
          </Text>
          <Text size="4">{name_in_kor}</Text>
          <HStack>
            <Text size="2" color="gray">
              {born_date_is_bc ? '기원전 ' : ''}
              {!isNil(born_date) && getIsValidDateString(born_date)
                ? format(new Date(born_date), 'y년 M월 d일 ')
                : '???'}
              - {died_date_is_bc ? '기원전 ' : ''}
              {!isNil(died_date) && getIsValidDateString(died_date)
                ? format(new Date(died_date), 'y년 M월 d일 ')
                : '???'}
            </Text>
          </HStack>
          <Text size="1" color="gray">
            {nationality?.nationality}
          </Text>
          <Text size="1">
            {main_interests
              .map(mainInterest => mainInterest.main_interest)
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
          <VStack gap="10px" alignItems="start">
            <InfluencedList influenceds={influenceds} />
            <InfluencedByList influencedBys={influenced_bys} />
          </VStack>
        </VStack>
      </HStack>
      <HStack>
        <HStack gap="0">
          <Text>123</Text>
          <HeartIcon color="red" />
        </HStack>
        <Text>362 comments</Text>
      </HStack>
    </HStack>
  );
}
