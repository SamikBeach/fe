import { AuthorServerModel } from '@models/author';
import { HeartIcon } from '@radix-ui/react-icons';
import { Text } from '@radix-ui/themes';
import { getBornAndDiedDateText, getCenturyByDate } from '@utils/author';
import { isNil } from 'lodash';
import { HStack } from 'styled-system/jsx';

interface Props {
  author: AuthorServerModel;
}

export default function AuthorInfo({ author }: Props) {
  const {
    name,
    name_in_kor,
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
  } = author;

  const bornCentury = isNil(born_date) ? null : getCenturyByDate(born_date);
  const diedCentury = isNil(died_date) ? null : getCenturyByDate(died_date);

  const activeCenturyText =
    bornCentury === diedCentury
      ? `${bornCentury}세기`
      : `${bornCentury}세기, ${diedCentury}세기`;

  return (
    <>
      <HStack width="100%" justify="space-between">
        <Text size="4" weight="bold">
          {name}
        </Text>
        <HStack>
          <HStack gap="0">
            <Text>123</Text>
            <HeartIcon color="red" />
          </HStack>
          <Text>362 comments</Text>
        </HStack>
      </HStack>
      <Text size="3">{name_in_kor}</Text>
      <HStack>
        <Text size="2" color="gray">
          {getBornAndDiedDateText({
            bornDate: born_date,
            diedDate: died_date,
            bornDateIsBc: born_date_is_bc === 1,
            diedDateIsBc: died_date_is_bc === 1,
          })}
        </Text>
        <Text>{activeCenturyText}</Text>
      </HStack>
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
      <Text size="1">{regions.map(region => region.region).join(', ')}</Text>
      <Text size="1">{schools.map(school => school.school).join(', ')}</Text>
    </>
  );
}
