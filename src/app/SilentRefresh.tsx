'use client';

import { getNewAccessToken } from '@apis/auth';
import api from '@apis/config';
import { isLoggedInAtom } from '@atoms/auth';
import { useMutation } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

interface Props {
  refreshToken?: string;
}

export default function SilentRefresh({ refreshToken }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  const { mutate } = useMutation({
    mutationKey: ['token/access'],
    mutationFn: getNewAccessToken,
    onSuccess: ({ data }) => {
      api.defaults.headers.common['Authorization'] =
        `Bearer ${data.accessToken}`;

      setIsLoggedIn(true);
    },
  });

  useEffect(() => {
    if (!isLoggedIn && refreshToken !== undefined && refreshToken !== '') {
      mutate();
    }
  }, [isLoggedIn, refreshToken, mutate]);

  return <></>;
}
