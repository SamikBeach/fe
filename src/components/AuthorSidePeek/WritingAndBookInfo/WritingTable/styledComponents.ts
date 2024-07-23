import { styled } from 'styled-system/jsx';

export const Table = styled('table', {});

export const THead = styled('thead', {
  base: {
    height: '36px',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
});

export const HeaderRow = styled('tr', {});

export const HeaderCell = styled('th', {
  base: {
    fontSize: '13px',
    backgroundColor: 'gray.50',
    boxShadow: 'inset -1px -1px 0 rgba(0, 0, 0, 0.05)',
    textAlign: 'start',
    px: '14px',
    zIndex: 1,
  },
});

export const TBody = styled('tbody', {
  base: {
    width: '100%',
  },
});

export const Row = styled('tr', {
  base: {
    _hover: {
      backgroundColor: 'gray.50',
    },
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
