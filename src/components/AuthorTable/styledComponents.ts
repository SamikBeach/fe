import { styled } from 'styled-system/jsx';

export const Table = styled('table', {});

export const THead = styled('thead', {
  base: {
    height: '46px',
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
    border: '1px solid',
    borderColor: 'gray.100',
  },
});

export const TBody = styled('tbody', {
  base: {
    border: '1px solid',
    borderColor: 'gray.100',
    backgroundColor: 'white',
  },
});

export const Row = styled('tr', {
  base: {
    height: '60px',
  },
});

export const Cell = styled('td', {
  base: {
    px: '14px',
    borderBottom: '1px solid',
    borderColor: 'gray.100',
    fontSize: '14px',
  },
});
