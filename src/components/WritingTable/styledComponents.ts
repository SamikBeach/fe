import { styled } from 'styled-system/jsx';

export const Table = styled('table', {});

export const THead = styled('thead', {
  base: {
    height: '46px',
    position: 'sticky',
    top: 0,
    zIndex: 2,
  },
});

export const HeaderRow = styled('tr', {
  base: {
    backgroundColor: 'gray.50',
  },
});

export const HeaderCell = styled('th', {
  base: {
    fontSize: '14px',
    backgroundColor: 'gray.50',
    boxShadow:
      'inset 0 1px 0 rgba(0, 0, 0, 0.05),inset -1px -1px 0 rgba(0, 0, 0, 0.05)',
    textAlign: 'start',
    px: '14px',
    zIndex: 2,

    '&:first-of-type': {
      position: 'sticky',
      left: 0,
    },
  },
});

export const TBody = styled('tbody', {
  base: {
    border: '1px solid',
    borderTop: 'none',
    borderColor: 'gray.100',
  },
});

export const Row = styled('tr', {});

export const Cell = styled('td', {
  base: {
    px: '14px',
    borderBottom: '1px solid',
    borderColor: 'gray.100',
    fontSize: '14px',

    '&:first-of-type': {
      position: 'sticky',
      left: 0,
      backgroundColor: 'white',

      boxShadow: 'inset -1px 0 0 rgba(0, 0, 0, 0.05)',
      cursor: 'pointer',

      _hover: {
        backgroundColor: 'gray.50',
      },
    },
  },
});
