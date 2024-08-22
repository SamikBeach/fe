import { AuthorServerModel } from 'legacy_src/models/author';
import { Badge, Text, Tooltip } from '@radix-ui/themes';
import { HStack, VStack } from 'styled-system/jsx';
import { capitalize } from 'lodash';

interface Props {
  author: AuthorServerModel;
}

export default function AuthorAdditionalInfo({ author }: Props) {
  const {
    nationality,
    main_interests = [],
    educations = [],
    eras = [],
    regions = [],
    schools = [],
  } = author;

  return (
    <>
      <VStack alignItems="start" gap="4px" ml="10px">
        {nationality?.nationality !== undefined && (
          <Badge variant="outline" size="1" radius="full">
            {nationality.nationality}
          </Badge>
        )}
        {eras.length > 0 && (
          <HStack gap="4px" flexWrap="wrap">
            {eras.slice(0, 3).map(era => (
              <Badge key={era.era} variant="outline" size="1" radius="full">
                {era.era}
              </Badge>
            ))}
            {eras.slice(3).length > 0 && (
              <Tooltip
                content={eras
                  .slice(3)
                  .map(era => era.era)
                  .join(', ')}
              >
                <Text size="1" ml="4px">
                  +{eras.slice(3).length} more
                </Text>
              </Tooltip>
            )}
          </HStack>
        )}
        {regions.length > 0 && (
          <HStack gap="4px" flexWrap="wrap">
            {regions.slice(0, 3).map(region => (
              <Badge
                key={region.region}
                variant="outline"
                size="1"
                radius="full"
              >
                {region.region}
              </Badge>
            ))}
            {regions.slice(3).length > 0 && (
              <Tooltip
                content={regions
                  .slice(3)
                  .map(region => region.region)
                  .join(', ')}
              >
                <Text size="1" color="gray" ml="4px">
                  +{regions.slice(3).length} more
                </Text>
              </Tooltip>
            )}
          </HStack>
        )}
        {educations.length > 0 && (
          <HStack gap="4px" flexWrap="wrap">
            {educations.slice(0, 3).map(education => (
              <Badge
                key={education.education}
                variant="outline"
                size="1"
                radius="full"
              >
                {education.education}
              </Badge>
            ))}
            {educations.slice(3).length > 0 && (
              <Tooltip
                content={educations
                  .slice(3)
                  .map(education => education.education)
                  .join(', ')}
              >
                <Text size="1" color="gray" ml="4px">
                  +{educations.slice(3).length} more
                </Text>
              </Tooltip>
            )}
          </HStack>
        )}
        {main_interests.length > 0 && (
          <HStack gap="4px" flexWrap="wrap">
            {main_interests.slice(0, 3).map(mainInterest => (
              <Badge
                key={mainInterest.main_interest}
                variant="outline"
                size="1"
                radius="full"
              >
                {capitalize(mainInterest.main_interest)}
              </Badge>
            ))}
            {main_interests.slice(3).length > 0 && (
              <Tooltip
                content={main_interests
                  .slice(3)
                  .map(mainInterest => capitalize(mainInterest.main_interest))
                  .join(', ')}
              >
                <Text size="1" color="gray" ml="4px">
                  +{main_interests.slice(3).length} more
                </Text>
              </Tooltip>
            )}
          </HStack>
        )}
        {schools.length > 0 && (
          <HStack gap="4px" flexWrap="wrap">
            {schools.slice(0, 3).map(school => (
              <Badge
                key={school.school}
                variant="outline"
                size="1"
                radius="full"
              >
                {capitalize(school.school)}
              </Badge>
            ))}
            {schools.slice(3).length > 0 && (
              <Tooltip
                content={schools
                  .slice(3)
                  .map(school => capitalize(school.school))
                  .join(', ')}
              >
                <Text size="1" color="gray" ml="4px">
                  +{schools.slice(3).length} more
                </Text>
              </Tooltip>
            )}
          </HStack>
        )}
      </VStack>
    </>
  );
}
