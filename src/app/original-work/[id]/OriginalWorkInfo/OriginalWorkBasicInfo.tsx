import { OriginalWorkServerModel } from '@models/original-work';
import { HStack, VStack } from 'styled-system/jsx';
import { Avatar, Text } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addOriginalWorkLike,
  findOriginalWorkAllLikes,
  findOriginalWorkLike,
  removeOriginalWorkLike,
} from '@apis/original-work';

interface Props {
  originalWork: OriginalWorkServerModel;
}

export default function OriginalWorkBasicInfo({ originalWork }: Props) {
  const { id, title, title_in_eng, publication_date, publication_date_is_bc } =
    originalWork;

  const { mutate: addLike } = useMutation({
    mutationFn: () => addOriginalWorkLike({ originalWorkId: id, userId: 1 }),
    onSuccess: () => {
      refetchOriginalWorkLike();
      refetchOriginalWorkAllLikes();
    },
  });

  const { mutate: removeLike } = useMutation({
    mutationFn: () => removeOriginalWorkLike({ originalWorkId: id, userId: 1 }),
    onSuccess: () => {
      refetchOriginalWorkLike();
      refetchOriginalWorkAllLikes();
    },
  });

  const { data: originalWorkLike, refetch: refetchOriginalWorkLike } = useQuery(
    {
      queryKey: ['original-work-like', id],
      queryFn: () => findOriginalWorkLike({ originalWorkId: id, userId: 1 }),
      select: response => response.data,
    }
  );

  const { data: originalWorkAllLikes, refetch: refetchOriginalWorkAllLikes } =
    useQuery({
      queryKey: ['original-work-like/count', id],
      queryFn: () => findOriginalWorkAllLikes({ originalWorkId: id }),
      select: response => response.data.count,
    });

  return (
    <VStack alignItems="start" gap="20px" width="100%">
      <VStack position="relative" width="100%">
        <Avatar
          radius="medium"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg/440px-Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
          fallback="폴백"
          size="9"
          className={css({
            width: '260px',
            height: '260px',
            margin: '0 auto',
          })}
        />
        {originalWorkLike?.isExist ? (
          <HeartFilledIcon
            color="pink"
            width="40px"
            height="40px"
            className={css({
              zIndex: 2,
              position: 'absolute',
              right: '54px',
              bottom: '-10px',
            })}
            cursor="pointer"
            onClick={() => removeLike()}
          />
        ) : (
          <HeartIcon
            color="pink"
            width="40px"
            height="40px"
            className={css({
              zIndex: 2,
              position: 'absolute',
              right: '54px',
              bottom: '-10px',
            })}
            cursor="pointer"
            onClick={() => addLike()}
          />
        )}
      </VStack>
      <VStack alignItems="start" gap="2px">
        <Text size="6" weight="bold">
          {title}
        </Text>
        <Text size="4" color="gray">
          {title_in_eng}
        </Text>
        <Text size="3">
          {publication_date_is_bc === 1 ? 'BC' : ''}
          {publication_date}
        </Text>
        <HStack gap="2px">
          <Text>{originalWorkAllLikes}</Text>
          <HeartFilledIcon color="pink" />
        </HStack>
      </VStack>
    </VStack>
  );
}
