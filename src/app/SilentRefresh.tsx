'use client';

import { getNewAccessToken } from '@apis/auth';
import api from '@apis/config';
import { getMyUserInfo } from '@apis/user';
import { isLoggedInAtom } from '@atoms/auth';
import { currentUserAtom } from '@atoms/user';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

interface Props {
  refreshToken?: string;
}

export default function SilentRefresh({ refreshToken }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const setCurrentUser = useSetAtom(currentUserAtom);

  const [isEnabledGetMyUserInfo, setIsEnabledGetMyUserInfo] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ['token/access'],
    mutationFn: getNewAccessToken,
    onSuccess: ({ data }) => {
      api.defaults.headers.common['Authorization'] =
        `Bearer ${data.accessToken}`;

      setIsLoggedIn(true);
      setIsEnabledGetMyUserInfo(true);
    },
  });

  const { data: userInfo } = useQuery({
    queryKey: ['user/my'],
    queryFn: getMyUserInfo,
    enabled: isEnabledGetMyUserInfo,
    select: data => data.data,
  });

  useEffect(() => {
    if (userInfo !== undefined) {
      setCurrentUser(userInfo);
    }
  }, [userInfo, setCurrentUser]);

  useEffect(() => {
    if (!isLoggedIn && refreshToken !== undefined && refreshToken !== '') {
      mutate();
    }
  }, [isLoggedIn, refreshToken, mutate]);

  return <></>;
}
